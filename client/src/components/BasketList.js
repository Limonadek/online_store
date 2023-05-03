import React, { useContext, useEffect, useState } from "react"
import "../styles/pageBasket/pageBasket.css"
import { Context } from ".."
import BasketItem from "./BasketItem"
import { deleteDeviceBasket, getBasket, updateDeviceInBasket } from "../http/basketApi"
import { observer } from "mobx-react-lite"
import { updateDevice } from "../http/deviceApi"
import { updateAllPrice } from "../utils/updateAllPrice"

const BasketList = observer(() => {

    const { user } = useContext(Context);
    const { basket } = useContext(Context);
    const {basketDevice} = useContext(Context);

    useEffect(() => {
        getBasket(user.user.id).then(data => {
            basket.setDevices(data)
            basket.setAllPrice(updateAllPrice(data));
        });
    }, [basketDevice.device])


    const removeItem = (item) => {
        basket.setDevices(basket.devices.filter(p => p.id !== item.id))

        updateDevice(item.id, 1, item.price)
        updateDeviceInBasket(user.user.id, item.id, false)
        deleteDeviceBasket(user.user.id, item.id)
        basket.setAllPrice(updateAllPrice(basket.devices))
    }

    return (
        <ul className='list basket__list'>
            {basket.devices.map(device => (
                <BasketItem
                    key={device.id}
                    remove={removeItem}
                    device={device}
                />
            ))}
        </ul>
    )
})

export default BasketList
