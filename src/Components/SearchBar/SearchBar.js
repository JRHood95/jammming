import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            term: ''
        };

        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
        this.enterPressed = this.enterPressed.bind(this)
    }

    // SET THE ARGUMENT OF THE SEARCH METHOD TO THE STATE OF TERM
    search() {
        this.props.onSearch(this.state.term);
    }

    // SET THE STATE OF THE SEARCH BARS TERM TO THE EVENT TARGETS VALUES
    handleTermChange(event) {
        this.setState({term: event.target.value})
    }

    // TRIGGER SEARCH ONCE 'ENTER' KEY IS PRESSED
    enterPressed(event) {
        let code = event.keyCode || event.which; // Use either keyCode or which, depending on browser support
        if(code === 13) { // 13 is the 'enter' key code
            this.search();
        }
    }

    render() {
        return (
            <div className="SearchBar">
                <input placeholder="Enter A Song, Album, or Artist"
                       onChange={this.handleTermChange}
                       onKeyPress={this.enterPressed}
                />
                <a onClick={this.search}>SEARCH</a>
            </div>
        );
    }
}

export default SearchBar;