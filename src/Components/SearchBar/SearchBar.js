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
    }

    // SET THE ARGUMENT OF THE SEARCH METHOD TO THE STATE OF TERM
    search() {
        this.props.onSearch(this.state.term);
    }

    // SET THE STATE OF THE SEARCH BARS TERM TO THE EVENT TARGETS VALUES
    handleTermChange(event) {
        this.setState({term: event.target.value})
    }

    render() {
        return (
            <div className="SearchBar">
                <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange}/>
                <a onClick={this.search}>SEARCH</a>
            </div>
        );
    }
}

export default SearchBar;