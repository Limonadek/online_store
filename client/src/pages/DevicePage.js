import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/esm/Card";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Image from "react-bootstrap/esm/Image";
import starRating from "../assets/star-rating.png";
import {useParams} from 'react-router-dom';
import { getDevice, updateDevice } from "../http/deviceApi";
import { addToBasket, checkInBasket, deleteDeviceBasket, getBasket, updateDeviceInBasket } from '../http/basketApi'
import { observer } from "mobx-react-lite";
import { Context } from "..";
import { check } from "../http/userApi";

const DevicePage = observer(() => {

    const { user } = useContext(Context);
    const { basket } = useContext(Context);

    const [add, setAdd] = useState(false);
    const [device, setDevice] = useState({info: []});
    const {id} = useParams();
    
    useEffect(() => {
        check().then(data => {
            user.setUser(data);
        })

        getDevice(id).then(data => {
            setDevice(data)
            
            console.log(user.user.id, data.id);
            checkInBasket(user.user.id, data.id).then(data => {
                setAdd(data);
            })
        })
    }, [])


    const addBasket = () => {
        setAdd(true);
        updateDeviceInBasket(user.user.id, device.id, true)
        addToBasket(device.id, user.user.id).then(data => {
            console.log(data);
            basket.setBasketId(data.basketId);
        });
    }

    const removeBasket = () => {
        setAdd(false);
        updateDevice(device.id, 1, device.price)
        deleteDeviceBasket(user.user.id, device.id)
        updateDeviceInBasket(user.user.id, device.id, false)
    }

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
                        {add
                            ? 
                                <Button onClick={removeBasket} variant={'outline-dark'}>Убрать из корзины</Button> 
                            : 
                                <Button onClick={addBasket} variant={'outline-dark'}>Добавить в корзину</Button>
                        }
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
});

export default DevicePage;