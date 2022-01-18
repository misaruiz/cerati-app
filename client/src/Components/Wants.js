import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Row, Col, Card, Ratio } from 'react-bootstrap';

export default function Wants() {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        // GET user wantlist
        const baseUrl = process.env.REACT_APP_DISCOGS_API_BASE_URL;
        const username = process.env.REACT_APP_USERNAME;
        axios.get(`${baseUrl}/users/${username}/wants`)
            .then(response => {
                if (isLoading) {
                    setData(response.data);
                }
            })
            .catch(error => console.log("Error fetching and parsing data", error))
            .finally(() => setIsLoading(false)); 
    });


    return (
        <Col lg={3}>
            <h3 className='text-white'>Wantlist</h3>
            <Row xs={2} md={3} lg={2} className='g-4'>
                {isLoading
                    ? <h1>Loading...</h1>
                    : data.wants.map(want =>  (
                        <Col key={want.id}>
                            <Card className='bg-dark shadow-sm border-0 text-white'>
                                <Ratio aspectRatio='1x1'>
                                    <Card.Img variant="top" src={want.basic_information.cover_image} />
                                </Ratio>
                                <Link to={`/wants/${want.id}`} className='stretched-link' />
                            </Card>
                        </Col>
                        )
                    )
                }
            </Row>
        </Col>
    )
};