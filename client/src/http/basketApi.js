import { $authHost, $host } from "./index.js";

export const addToBasket = async (deviceId, userId) => {
    const {data} = await $authHost.post('api/basket', {body: {
        deviceId, userId
    }})
    return data
}

export const getBasket = async (userId) => {
    const {data} = await $authHost.get('api/basket', {params: {
        userId
    }})
    return data
}

export const deleteDeviceBasket = async (userId, deviceId) => {
    const {data} = await $authHost.delete('api/basket', {params: {
        userId, deviceId
    }})
    return data;
}

export const updateDeviceInBasket = async (userId, deviceId, inBasket) => {
    const {data} = await $authHost.put('api/basket', {body: {
        userId, deviceId, inBasket
    }})
    return data;
}

export const checkInBasket = async (userId, deviceId) => {
    const {data} = await $authHost.get(`api/basket/${deviceId}`, {params: {
        userId, deviceId
    }});
    return data;
}

