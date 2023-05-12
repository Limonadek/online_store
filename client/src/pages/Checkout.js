import React, { useContext, useEffect, useState } from "react"
import Container from "react-bootstrap/esm/Container"
import Form from "react-bootstrap/esm/Form";
import Dropdown from "react-bootstrap/esm/Dropdown";
import { Context } from "..";
import { check } from "../http/userApi";
import "../styles/pageCheckout/pageCheckout.css";
import Button from "react-bootstrap/esm/Button";
import { deleteDeviceBasket, getBasket } from "../http/basketApi";
import { updateAllPrice } from "../utils/updateAllPrice";
import { updateDevice } from "../http/deviceApi";
import { createOrder } from "../http/checkoutApi";

const Checkout = () => {

    const { user } = useContext(Context);
    const { basket } = useContext(Context);

    const [submit, setSubmit] = useState(false);
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [payment, setPayment] = useState('');
    const [address, setAddress] = useState('');
    const [allPrice, setAllPrice] = useState(0);

    useEffect(() => {
        check().then(data => {
            user.setUser(data);
        })

        getBasket(user.user.id).then(data => {
            basket.setDevices(data)
            basket.setAllPrice(updateAllPrice(data));
            setAllPrice(basket.allPrice);
        });

    }, [])

    const onSubmit = (e) => {
        e.preventDefault();
        setSubmit(true);

        const formData = new FormData()

        formData.append('userId', user.user.id);
        formData.append('email', user.user.email);
        formData.append('name', name);
        formData.append('lastName', lastName);
        formData.append('payment', payment);
        formData.append('address', address);
        formData.append('totalPrice', basket.allPrice);

        createOrder(formData).then(data => console.log(data));

        getBasket(user.user.id).then(data => {
            basket.setDevices(data)

            basket.devices.map(device => {
                deleteDeviceBasket(user.user.id, device.id)
                updateDevice(device.id, 1, device.price)
            })
        });
    }

    return (
        <Container className='d-flex flex-row justify-content-center'>
            <div className="checkout">
                <h1 className='checkout__heading'>Оформление заказа</h1>
                <div className='checkout-information'>
                    <h2 className='checkout-information__heading'>Ваш заказ</h2>
                    <ul className='list checkout-information__list'>
                        <li className='checkout-information__item'>
                            <p className='checkout-information__text'>Товары</p>
                            <div className='checkout-information__separator'></div>
                            <p className='checkout-information__text checkout-information__text--bold'>{basket.allPrice}</p>
                        </li>
                        <li className='checkout-information__item'>
                            <p className='checkout-information__text'>Стоимость доставки</p>
                            <div className='checkout-information__separator'></div>
                            <p className='checkout-information__text checkout-information__text--bold'>0</p>
                        </li>
                    </ul>
                    <span className='checkout-information__text'>Итого</span>
                    <p className='checkout-information__text checkout-information__text--bold'>{basket.allPrice}</p>
                </div>
                <Form onSubmit={onSubmit} method='post' className="d-flex flex-column justify-content-center" >
                    <Form.Group className="mb-3">
                        <Form.Label>Имя</Form.Label>
                        <Form.Control 
                            variant={'outline-dark'}
                            placeholder='Введите свое имя'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Фамилия</Form.Label>
                        <Form.Control 
                            variant={'outline-dark'}
                            placeholder='Введите свою фамилию'
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Адрес</Form.Label>
                        <Form.Control 
                            variant={'outline-dark'}
                            placeholder='Введите адрес куда нужно доставить'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </Form.Group>
                    <Dropdown className="mt-2 mb-2 d-flex flex-column">
                        <Form.Label>Оплата</Form.Label>
                        <Dropdown.Toggle>{ payment || 'Выберите способ оплаты'}</Dropdown.Toggle>
                        <Dropdown.Menu className='w-100 text-center'>
                                <Dropdown.Item className='w-100'onClick={() => setPayment('Оплата при получении')}>Оплата при получении</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    
                    <Button className="mt-5" type={"submit"} variant={"outline-success"}>Оформить заказ</Button>
                </Form>
            </div>
        </Container>
    )
}

export default Checkout
