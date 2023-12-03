import React, { Component } from 'react';
import './vatar.style.css'

class Avatar extends Component {
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

export default Avatar;
