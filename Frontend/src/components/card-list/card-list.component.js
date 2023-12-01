import React, { Component } from 'react';
import './card-list.style.css'; // Import the CSS file for styling


class Cards extends Component {
    render() {
        const { attractions } = this.props;
        return (
            <div className='card-list'>
                {attractions.map((attractions) => (
                    <div className='card-container' key={attractions.id}>
                        <img alt={`attraction ${attractions.name}`} src={attractions.image[0]} />
                        <p>{attractions.name}</p>
                        <p>{attractions.description}</p>
                    </div>
                ))}
            </div>
        );
    }

}

export default Cards;