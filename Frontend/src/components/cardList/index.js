import React, { useState, useEffect } from 'react';
import './index.css'; // Import the CSS file for styling
import { Spinner, Placeholder } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Cards = ({ attractions }) => {
    const [showContent, setShowContent] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 1500);
  
      // Clean up the timer when the component unmounts
      return () => clearTimeout(timer);
    }, []);

    const getImg = (attractions) => {
        if (Array.isArray(attractions.image)) {
            return attractions.image[0];
        }
        else {
            return attractions.image
        }
    }

    const pageSwitch = (attractionId) => {
        navigate(`/detail?id=${attractionId}`);
    };

        return (
            <>
                <div className='card-list'>
                    {attractions.map((attractions, index) => (
                        <div key={index}>
                            {showContent ? (
                                <div className='card-container' key={attractions.id} onClick={() => { pageSwitch(attractions.id) }}>
                                    <img className="card-img" alt={`attraction ${attractions.name}`} src={getImg(attractions)} />
                                    <div className="card-intro-area">
                                        <p className='card-title'>{attractions.name}</p>
                                        <p className='card-text'>{attractions.description}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className='card-container' key={attractions.id}>
                                    <div className="card-img"><Spinner animation="grow" /></div>
                                    <div className="card-intro-area">
                                        <Placeholder className='card-title' animation="glow">
                                            <Placeholder xs={6} />
                                        </Placeholder>
                                        <Placeholder className='card-text' animation="glow">
                                            <Placeholder style={{ margin: '30px 0 0 0' }} xs={7} /> <Placeholder style={{ margin: '30px 0 0 0' }} xs={4} /> <Placeholder xs={4} />{' '}
                                            <Placeholder xs={6} /> <Placeholder xs={8} />
                                        </Placeholder>
                                    </div>
                                </div>
                            )}

                        </div>

                    ))}
                </div>
            </>

        );

}

export default Cards;