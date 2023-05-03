export const updateAllPrice = (data) => {
    let allPrice = 0;
    data.map((device) => {
        allPrice += device.totalPrice;
    })

    return allPrice;
}