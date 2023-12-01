import React, { Component } from 'react';
import SearchBar from '../../components/search-bar/search-bar.component';
import Cards from '../../components/card-list/card-list.component';
import "./homepage.style.css"

class Homepage extends Component {
    constructor() {
        super();

        this.state = {
            attractions: [],
            searchField: ''
        };
    }

    componentDidMount() {
        fetch('https://raw.githubusercontent.com/YBY2000/INFO1650_FP/main/data/INFO6150.attractions.json')
            .then((response) => response.json())
            .then((data) => {
                this.setState(
                    () => {
                        return { attractions: data }
                    }
                )
            })
            .catch((error) => {
                console.error("Error fetching attraction data:", error);
            });
    }

    onSearchChange = e => {
        const searchField = e.target.value.toLocaleLowerCase();
        this.setState(() => {
            return { searchField };
        })
    }

    render() {
        const { attractions, searchField } = this.state;
        const { onSearchChange } = this;

        const filteredAttractions = attractions.filter((attraction) => {
            return attraction.name.toLocaleLowerCase().includes(searchField);
        });

        return (
            <div className='App'>
                <SearchBar onChangeHandler={onSearchChange} />
                {/* <CardList attractions={filteredAttractions} /> */}
                <Cards attractions={filteredAttractions} />
            </div>
        );
    }
}

export default Homepage;