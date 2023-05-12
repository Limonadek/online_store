import React, { useContext, useEffect } from "react";
import Card from "react-bootstrap/esm/Card";
import { getBasket } from "../http/basketApi";
import { Context } from ".."
import { observer } from "mobx-react-lite";

const OrderItem = observer(({order}) => {

    const { basket } = useContext(Context)

    useEffect(() => {
        getBasket(order.userId).then(data => {
            basket.setDevices(data)
        });
    }, [])

    return (
            <Card style={{width: 300, padding: '15px'}} border={'dark'}>
                {basket.devices.map((device) => {
                    <div key={device.name}>
                        <p>Товар: {device.name}</p>
                    </div>
                })}
                <div>Имя: {order.name}</div>
                <div>Фамилия: {order.lastName}</div>
                <div>Способ оплаты: {order.payment}</div>
                <div>Адресс доставки: {order.address}</div>
            </Card>
    );
})

export default OrderItem;
