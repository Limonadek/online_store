import React, { useContext, useEffect, useState } from "react"
import Image from "react-bootstrap/esm/Image"
import Button from "react-bootstrap/esm/Button"
import FormControl from "react-bootstrap/esm/FormControl"
import "../styles/pageBasket/pageBasket.css";
import { Context } from "..";
import { observer } from "mobx-react-lite";
import { updateDevice } from "../http/deviceApi";

const BasketItem = observer(({device, remove}) => {

    const {basketDevice} = useContext(Context);

    const [price, setPrice] = useState(device.totalPrice);
    const [values, setValues] = useState(device.allValues);

    const updateValues = (newValue) => {
        if (newValue <= 0 || newValue >= 1000) return;

        updateDevice(device.id, newValue, newValue * device.price).then(data => {
            basketDevice.setDevice(data);
            setValues(data.allValues);
            setPrice(data.totalPrice);
        });

    }

    
    return (
        <li className='list__item basket__item'>
            <Image
                width={250}
                height={250}
                src={process.env.REACT_APP_API_URL + device.img}
            />
            <div className='basket__container'>
                <div className='info basket__info'>
                    <p className='info__heading'>Название: {device.name}</p>
                    {/* <p className='info__type'>{device.info}</p>
                    <p className='info__brand'>{device.info}</p> */}
                    <Button
                        className='basket__delete'
                        variant={"outline-dark"}
                        onClick={() => remove(device)}
                    >
                        Удалить
                    </Button>
                </div>
                <div className='basket__quantity'>
                    <p>Количество: </p>
                    <Button
                        onClick={() => updateValues(values - 1)}
                        variant={"outline-dark"}
                    >
                        --
                    </Button>
                    <FormControl
                        style={{ width: "150px" }}
                        placeholder='Количество'
                        value={values}
                        onChange={e => updateValues(Number(e.target.value))}
                    />
                    <Button
                        onClick={() => updateValues(values + 1)}
                        variant={"outline-dark"}
                    >
                        +
                    </Button>
                </div>
                <p>Цена: {price}</p>
            </div>
        </li>
    )
})

export default BasketItem;
