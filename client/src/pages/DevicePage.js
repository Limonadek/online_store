import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/esm/Card";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Image from "react-bootstrap/esm/Image";
import starRating from "../assets/star-rating.png";
import {useParams} from 'react-router-dom';
import { getDevice } from "../http/deviceApi";

const DevicePage = () => {

    const [device, setDevice] = useState({info: []});
    const {id} = useParams();
    useEffect(() => {
        getDevice(id).then(data => setDevice(data))
    }, [])

    return (
        <Container className='mt-3'>
            <div className='d-flex flex-row flex-wrap justify-content-around gap-3'>
                <Col md={4}>
                    <Image src={process.env.REACT_APP_API_URL + device.img} width={300} height={300} />
                </Col>
                <Col md={4} style={{width: 240, height: 285}}>
                    <div className='d-flex flex-column align-items-center'>
                        <h2>{device.name}</h2>
                        <div
                            className='d-flex align-items-center justify-content-center'
                            style={{background: `url(${starRating}) center center no-repeat`, width: 240, height: 240, backgroundSize: 'cover', fontSize: 64}}
                        >
                        {device.rating} 
                        </div>
                    </div>
                </Col>
                <Col md={4}>
                    <Card
                        className='d-flex flex-column align-items-center justify-content-around'
                        style={{width: 300, height: 300, fontSize: 32, border: '5px solid lightgray'}}
                    >
                        <h3>От: {device.price} руб.</h3>
                        <Button variant={'outline-dark'}>Добавить в корзину</Button>
                    </Card>
                </Col>
            </div>
            <div className='d-flex flex-column m-3'>
                <h1>Характеристики</h1>
                {device.info.map((info, index) => 
                    <div key={info.id} style={{background: index % 2 === 0 ? 'lightgray': 'transparent', padding: 10}}>
                        {info.title}: {info.description}
                    </div>
                )}
            </div>
        </Container>
    );
};

export default DevicePage;