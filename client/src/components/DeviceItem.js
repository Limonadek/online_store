import React from "react";
import Card from "react-bootstrap/esm/Card";
import Col from "react-bootstrap/esm/Col";
import Image from "react-bootstrap/esm/Image";
import star from "../assets/star.png";
import {useNavigate} from "react-router-dom";
import { DEVICE_ROUTE } from "../utils/consts";

const DeviceItem = ({device}) => {
    const navigate = useNavigate();
    return (
        <Col md={3} className='mt-3' onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}>
            <Card style={{width: 150, cursor: 'pointer'}} border={'light'}>
                <Image width={150} height={150} src={process.env.REACT_APP_API_URL + device.img} />
                <div className='text-black-50 mt-1 d-flex justify-content-between align-items-center'>
                    <div>Apple...</div>
                    <div className='d-flex align-items-center'>
                        <div>{device.rating}</div>
                        <Image src={star} height={18} width={18} />
                    </div>
                </div>
                <div>{device.name}</div>
            </Card>
        </Col>
    );
}

export default DeviceItem;
