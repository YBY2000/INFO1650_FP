import React, { Component } from 'react';
import './card-list.style.css'; // Import the CSS file for styling


class Cards extends Component {

    getImg(attractions) {
        if (Array.isArray(attractions.image)) {
            return attractions.image[0];
        }
        else {
            return attractions.image
        }
    }

    render() {
        const { attractions } = this.props;
        const { getImg } = this;
        return (
            <div className='card-list'>
                {attractions.map((attractions) => (
                    <div className='card-container' key={attractions.id}>
                        <img className="card-img" alt={`attraction ${attractions.name}`} src={getImg(attractions)} />
                        <div class="card-intro-area">
                            <p className='card-title'>{attractions.name}</p>
                            <p className='card-text'>{attractions.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

}

export default Cards;