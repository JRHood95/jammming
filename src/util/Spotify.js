const clientID = '55d55ab0f39843d49b0e6cba2eb6d319';
// const redirectURI = 'https://jrhjammming.surge.sh';
const redirectURI = 'http://localhost:3000/';
const searchItem = 'https://api.spotify.com/v1/';
const accessItem = 'https://accounts.spotify.com/authorize';

let token;

const Spotify = {

    // GET ACCESS TOKEN FROM SPOTIFY
    getAccessToken() {
        if(token) {
            return token;
        }
        const URLToken = window.location.href.match(/access_token=([^&]*)/);
        const tokenExpiration = window.location.href.match(/expires_in=([^&]*)/);
        if (URLToken && tokenExpiration) {
            token = URLToken[1];
            const expires = Number(tokenExpiration[1]);
            window.setTimeout(()=> token = '', expires * 1000);
            window.history.pushState('Access Token', null, '/');
            return token;
        } else {
            const accessURL = `${accessItem}?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
            window.location = accessURL;
        }
    },

    // USE ACCESS TOKEN TO RETURN A RESPONSE FORM THE SPOTIFY API
    search(term) {
        let token = Spotify.getAccessToken();
        return fetch(`${searchItem}search?type=track&q=${term}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if(!jsonResponse.tracks){
                return [];
            }
            return jsonResponse.tracks.items.map( track => ({
                id: track.id,
                name : track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }))
        })
    },

    // GET USERS ID FROM SPOTIFY, CREATE A NEW PLAYLIST ON USERS ACCOUNT AND ADD TRACKS TO THE PLAYLIST
    savePlaylist(name, trackUris) {
        if (!name || !trackUris || trackUris.length === 0) return;
        const searchURL = searchItem + 'me';
        const headers = {
            Authorization: `Bearer ${token}`
        };
        let userID;
        let playlistID;
        fetch(searchURL, {
            headers: headers
        })
            .then(response => response.json())
            .then(jsonResponse => userID = jsonResponse.id)
            .then(() => {
                const createPlaylistUrl = `${searchItem}users/${userID}/playlists`;
                fetch(createPlaylistUrl, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({
                        name: name
                    })
                })
                    .then(response => response.json())
                    .then(jsonResponse => playlistID = jsonResponse.id)
                    .then(() => {
                        const addPlaylistTracksUrl = `${searchItem}users/${userID}/playlists/${playlistID}/tracks`;
                        fetch(addPlaylistTracksUrl, {
                            method: 'POST',
                            headers: headers,
                            body: JSON.stringify({
                                uris: trackUris
                            })
                        });
                    })
            })
    }
};

export default Spotify;