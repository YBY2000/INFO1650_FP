import React, { Component } from 'react';
import './search-bar.style.css'

class SearchBar extends Component {
    render() {
        return (
            <input
                className='search-box'
                type='search'
                placeholder='search attraction'
                onChange={this.props.onChangeHandler}
            />
        );

    }
}

export default SearchBar;
