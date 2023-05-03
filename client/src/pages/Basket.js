import React, { useContext, useEffect, useState } from "react"
import Container from "react-bootstrap/esm/Container"
import "../styles/pageBasket/pageBasket.css";
import { observer } from "mobx-react-lite"
import BasketList from "../components/BasketList"
import { Context } from "..";
import { check } from "../http/userApi";
import { CHECKOUT_ROUTE } from "../utils/consts";
import { useNavigate } from "react-router-dom";

const Basket = observer(() => {
    const navigate = useNavigate();

    const { user } = useContext(Context);
    const { basket } = useContext(Context);

    useEffect(() => {
        check().then(data => {
            user.setUser(data);
        })
    }, [])

    return (
        <Container className='d-flex flex-row justify-content-between'>
            <div className="basket">
                <div className="basket__heading">Cart - {basket.devices.length} items</div>
                <BasketList/>
            </div>
            <div className="summary">
                <div className="summary__heading">Summary</div>
                <div className="summary__total-amount">{basket.allPrice}</div>
                <button className="summary__push" onClick={() => navigate(CHECKOUT_ROUTE)}>GO TO CHECKOUT</button>
            </div>
        </Container>
    )
})

export default Basket
