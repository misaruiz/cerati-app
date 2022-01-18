import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Container, Navbar } from 'react-bootstrap';


export default function Profile() {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        // GET user profile
        const baseUrl = process.env.REACT_APP_DISCOGS_API_BASE_URL;
        const username = process.env.REACT_APP_USERNAME;
        axios.get(`${baseUrl}/users/${username}`)
            .then(response => {
                if (isLoading) {
                    setData(response.data);
                }
            })
            .catch(error => console.log("Error fetching and parsing data", error))
            .finally(() => setIsLoading(false)); 
    });

    return (

        <Navbar bg="secondary" variant="dark">
            <Container>
            <Navbar.Brand href="#home">
            {isLoading
                ?   <h1>Loading...</h1>
                :   <>
                        <img
                        alt=""
                        src={data.avatar_url}
                        width="30"
                        height="30"
                        className="d-inline-block align-top rounded-circle"
                        />{' '}
                        {data.name} <span className='text-white-50'>Discogs Dashboard</span>
                </>
            }
            </Navbar.Brand>
            </Container>
        </Navbar>
    )
};