import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { config } from '../config';

export const Header = () => {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => { 
        const headers = {'Authorization' : `Discogs key=${config.consumerKey}, secret=${config.consumerSecret}`};
        axios({
        method: 'get',
        url: 'https://api.discogs.com/users/misaruiz',
        headers
        })
        .then(response => {
            if (isLoading) {
                setData(response.data);
            }
        })
        .catch(error => console.log('Error fetching and parsing data', error))
        .finally(() => setIsLoading(false));
    }, [isLoading]);
    return (
        <div>Hi</div>
    )
}