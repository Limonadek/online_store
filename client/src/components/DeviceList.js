import { observer } from "mobx-react-lite";
import React from "react";
import Row from "react-bootstrap/esm/Row";
import { useContext } from "react";
import { Context } from "../index";
import DeviceItem from "./DeviceItem";


const DeviceList = observer(() => {
    const {device} = useContext(Context);

    return (
        <Row className='d-flex'>
            {device.devices.map((device) =>
                <DeviceItem key={device.id} device={device} />
            )}
        </Row>
    );
})

export default DeviceList;
