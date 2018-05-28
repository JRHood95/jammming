import React from 'react';
import './App.css';
import SearchResults from '../SearchResults/SearchResults';
import SearchBar from '../SearchBar/SearchBar';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchResults: [],
            playlistName: 'New Playlist',
            playlistTracks: [],
        };

        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);
        this.search = this.search.bind(this);
    }

    // ADD TRACK FROM SEARCH RESULTS TO PLAYLIST
    addTrack(track) {
        if (this.state.playlistTracks.find(addTrack => addTrack.id === track.id)) {
            return;
        }
        let tracks = this.state.playlistTracks;
        tracks.push(track);
        this.setState({playlistTracks: tracks});
    }

    // REMOVE TRACK FROM PLAYLIST
    removeTrack(track) {
        let tracks = this.state.playlistTracks;
        tracks = tracks.filter(current => current.id !== track.id);
        this.setState({ playlistTracks: tracks});
    }

    // UPDATE NAME OF PLAYLIST
    updatePlaylistName(name) {
        this.setState({playlistName: name});
    }

    // SAVE PLAYLIST NAME AND TRACKS TO USERS ACCOUNT
    savePlaylist() {
        const trackUris = this.state.playlistTracks.map(playlistTrack => playlistTrack.uri);
        Spotify.savePlaylist(this.state.playlistName, trackUris);

        // RESET EVERYTHING AFTER SAVING A PLAYLIST
        this.setState({
            searchResults: [],
            playlistTracks: []
        });
        this.updatePlaylistName('New Playlist');
    }

    // SEND SEARCH TERM REQUEST TO SPOTIFY AND RETURN RESULTS TO SEARCH RESULTS
    search(term) {
        Spotify.search(term).then(searchResults => {
            this.setState({searchResults: searchResults})
        });
    }

    render() {
    return (
        <div>
            <h1>Ja<span className="highlight">mmm</span>ing</h1>
            <div className="App">
                <SearchBar onSearch={this.search}/>

                <div className="App-playlist">
                    <SearchResults
                        searchResults={this.state.searchResults}
                        onAdd={this.addTrack}
                    />

                    <Playlist
                        playlistName={this.state.playlistName}
                        playlistTracks={this.state.playlistTracks}
                        onRemove={this.removeTrack}
                        onNameChange={this.updatePlaylistName}
                        onSave = {this.savePlaylist}
                    />
                </div>

            </div>
        </div>
    );
    }
}

export default App;
