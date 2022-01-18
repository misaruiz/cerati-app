import React from 'react';
import { Container, Row } from 'react-bootstrap';
import Collection from './Collection';
import Wants from './Wants';

export default function Dashboard() {
    return (
        <Container className='mt-5'>
            <Row>
                <Collection />
                <Wants />
            </Row>
        </Container>
    )
};