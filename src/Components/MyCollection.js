import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { Container, Row, Col, Card, Ratio, Image } from 'react-bootstrap';

import { config } from '../config';

export default function MyCollection() {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => { 
        const headers = {'Authorization' : `Discogs key=${config.consumerKey}, secret=${config.consumerSecret}`};
        axios({
        method: 'get',
        url: 'https://api.discogs.com/users/misaruiz/collection/folders/0/releases',
        headers
        })
        .then(async response => {
            if (isLoading) {
            response.data.releases.map(record =>
                record.basic_information.artists.map(
                artist => (
                    axios({
                    method: 'get',
                    url: artist.resource_url,
                    headers
                    })
                    .then(response => artist.image = response.data.images[0].uri)
                    .catch(error => console.log('Error fetching and parsing data for artist', error))
                )
                ));
                setData(response.data);
            }
        })
        .catch(error => console.log('Error fetching and parsing data', error))
        .finally(() => setIsLoading(false));
    });

    return (
        <Container className='mt-4'>
            <Row xs={2} md={3} lg={4} className='g-4'>
            {isLoading
                ? <h1>Loading...</h1>
                : data.releases.map(record =>  (
                    <Col key={record.id}>
                        <Card className='bg-dark shadow-lg border-0 text-white'>
                            <Card.Header className='d-flex flex-row'>
                                <div className='avatar'>
                                    <Image src={record.basic_information.artists[0].image} aria-label="artist" roundedCircle />
                                </div>
                                <span className='fs-6 ms-2 align-self-center'>{record.basic_information.artists.map(artist => artist.name)}</span>
                            </Card.Header>
                            <Ratio aspectRatio='1x1'>
                                <Card.Img variant="top" src={record.basic_information.cover_image} />
                            </Ratio>
                            <Card.Body>
                                <Card.Title className='mb-0'>{record.basic_information.title}</Card.Title>
                                <Card.Text className='mb-0 text-secondary'>
                                    {record.basic_information.year} •
                                    {record.basic_information.formats.map(
                                        format => format.descriptions.map(
                                        (description, i) => (
                                            i===0  ?  ` ${description}`  :  `, ${description}`
                                        )
                                    ))}
                                </Card.Text>
                                <Link to={`/records/${record.id}`} className='stretched-link' />
                            </Card.Body>
                        </Card>
                    </Col>
                    )
                )
            }
            </Row>
        </Container>
    )
};