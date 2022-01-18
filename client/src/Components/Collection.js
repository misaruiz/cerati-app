import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { Row, Col, Card, Ratio } from 'react-bootstrap';

export default function Collection() {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    

    useEffect(() => {

        // GET user collection
        const baseUrl = process.env.REACT_APP_DISCOGS_API_BASE_URL;
        const username = process.env.REACT_APP_USERNAME;
        axios.get(`${baseUrl}/users/${username}/collection/folders/0/releases`)
            .then(response => {
                if (isLoading) {
                    setData(response.data);
                }
            })
            .catch(error => console.log("Error fetching and parsing data", error))
            .finally(() => setIsLoading(false)); 

            // if (!isLoading) {
            //     data.releases.forEach(release =>  {
            //         release.basic_information.formats.forEach(format => 
            //                 format.qty === '2' 
            //                     ?   format.descriptions.forEach(description => {
            //                                 if(description === 'LP') {
            //                                     description = '2xLP';
            //                                 }
            //                             }
            //                         ) 
            //                 :   null
            //         )
            //     }
            //     );
            // };
    });

    return (
        <Col lg={9}>
            <h3 className='text-white'>Collection</h3>
            <Row xs={2} md={3} lg={3} xl={4} className='g-4'>

                {isLoading
                    ? <h1>Loading...</h1>
                    : data.releases.map(release =>  (
                        <Col key={release.id}>
                            <Card className='bg-dark shadow-lg border-0 text-white'>
                                <Ratio aspectRatio='1x1'>
                                    <Card.Img variant="top" src={release.basic_information.cover_image} />
                                </Ratio>
                                <Card.Body>
                                    <Card.Title className='mb-0'>{release.basic_information.title}</Card.Title>
                                    <Card.Text className='mb-0'>
                                        {release.basic_information.artists.map(artist => artist.name)} 
                                    </Card.Text>
                                    <Card.Text className='text-muted mb-0'>
                                        {release.basic_information.year} <br/>
                                        
                                        {release.basic_information.formats.map(
                                            format => 
                                                format.qty === '2'
                                                ?   format.descriptions.forEach(description =>
                                                        description === 'LP' ? description = '2xLP'
                                                    :    description === 'Reissue' ? description = 'RE'
                                                    :   description === 'Limited Edition' ? description = 'Ltd'
                                                    :   description === 'Compilation' ? description = 'Comp'
                                                    :   null)
                                                :   format.descriptions.map(description => 
                                                        description === 'Reissue' ? description = 'RE'
                                                    :   description === 'Limited Edition' ? description = 'Ltd'
                                                    :   description === 'Compilation' ? description = 'Comp'
                                                    :   description = description).join(', ')
                                                )}
                                    </Card.Text>
                                    <Link to={`/releases/${release.id}`} className='stretched-link' />
                                </Card.Body>

                            </Card>
                        </Col>
                        )
                    )
                }
            </Row>
        </Col>
    )
};