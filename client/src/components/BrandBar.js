import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import Card from "react-bootstrap/esm/Card";
import Row from "react-bootstrap/esm/Row";
import { Context } from "../index";

const BrandBar = observer(() => {

    const {device} = useContext(Context);

    return (
        <div className='d-flex flex-wrap'>
            {device.brands.map((brand) => 
                <Card
                    style={{cursor: 'pointer'}}
                    key={brand.id}
                    className='p-3'
                    border={brand.id === device.selectedBrand.id ? 'danger' : 'light'}
                    onClick={() => device.setSelectedBrand(brand)}
                >
                    {brand.name}
                </Card>
            )}
        </div>
    );
})

export default BrandBar;
