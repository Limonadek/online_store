import React, { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/esm/Form";
import Modal from "react-bootstrap/esm/Modal";
import Button from "react-bootstrap/esm/Button";
import Dropdown from "react-bootstrap/esm/Dropdown";
import { Context } from "../../index";
import Col from "react-bootstrap/esm/Col";
import { createDevice, getBrands, getTypes } from "../../http/deviceApi";
import { observer } from "mobx-react-lite";

const CreateDevice = observer(({show, onHide}) => {
    const {device} = useContext(Context);

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [file, setFile] = useState(null);
    const [info, setInfo] = useState([]);

    useEffect(() => {
        getTypes().then(data => device.setTypes(data))
        getBrands().then(data => device.setBrands(data))
    }, [])

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}])
    }

    const removeInfo = (number) => {
        setInfo(info.filter((i) => i.number !== number))
    }

    const changeInfo = (key, value, number) => {
        setInfo(info.map((i) => i.number === number ? {...i, [key]: value} : i))
    }

    const selectFile = (e) => {
        setFile(e.target.files[0])
    }

    const addDevice = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', `${price}`)
        formData.append('img', file);
        formData.append('brandId', device.selectedBrand.id);
        formData.append('typeId', device.selectedType.id);
        formData.append('info', JSON.stringify(info))
        createDevice(formData).then(data => onHide())
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить устройство
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{device.selectedType.name || 'Выберите тип'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.types.map((type) =>
                                <Dropdown.Item key={type.id} onClick={() => device.setSelectedType(type)}>{type.name}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{device.selectedBrand.name || 'Выберите бренд'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.brands.map((brand) =>
                                <Dropdown.Item key={brand.id} onClick={() => device.setSelectedBrand(brand)}>{brand.name}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control 
                        className='mt-3'
                        placeholder='Введите название устройства'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Form.Control 
                        className='mt-3'
                        placeholder='Введите стоимость устройства'
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        type='number'
                    />
                    <Form.Control 
                        className='mt-3'
                        type='file'
                        onChange={selectFile}
                    />
                    <hr/>
                    <Button
                        variant={'outline-dark'}
                        onClick={addInfo}
                    >
                        Добавить новое свойство
                    </Button>

                    {info.map((i) => 
                        <div key={i.number} className='d-flex flex-row align-items-center mt-2 gap-3'>
                            <Col md={4}>
                                <Form.Control 
                                    placeholder='Введите название свойства'
                                    value={i.title}
                                    onChange={(e) => changeInfo('title', e.target.value, i.number)}
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control 
                                    placeholder='Введите описание свойства'
                                    value={i.description}
                                    onChange={(e) => changeInfo('description', e.target.value, i.number)}
                                />
                            </Col>
                            <Col md={4}>
                                <Button 
                                    onClick={() => removeInfo(i.number)}
                                    variant={'outline-danger'}
                                >
                                    Удалить
                                </Button>
                            </Col>
                        </div>
                    )}

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-danger' onClick={onHide}>Закрыть</Button>
                <Button variant='outline-success' onClick={addDevice}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
})

export default CreateDevice;
