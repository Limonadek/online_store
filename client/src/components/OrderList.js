import React, { useEffect, useState } from "react"
import "../styles/pageBasket/pageBasket.css"
import { observer } from "mobx-react-lite"
import { gerOrders } from "../http/checkoutApi";
import OrderItem from "./OrderItem"

const OrderList = observer(() => {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        gerOrders().then(data => {
            setOrders(data)
        });
    }, [])

    return (
        <>
            <h1 style={{marginTop: '60px'}}>Заказы</h1>
            <ul className='list basket__list'>
                {orders.map(order => (
                    <div key={order.id} style={{display: 'flex', flexDirection: 'row', marginBottom: '20px'}}>
                        <p>{order.id}</p>
                        <OrderItem
                            order={order}
                        />
                    </div>
                ))}
            </ul>
        </>
    )
})

export default OrderList
