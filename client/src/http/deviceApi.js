import { $authHost, $host } from "./index.js";

export const createType = async (type) => {
    const {data} = await $authHost.post('api/type', type)
    return data
}

export const getTypes = async () => {
    const {data} = await $host.get('api/type')
    return data
}

export const createBrand = async (brand) => {
    const {data} = await $authHost.post('api/brand', brand)
    return data
}

export const getBrands = async () => {
    const {data} = await $host.get('api/brand')
    return data
}

export const createDevice = async (device) => {
    const {data} = await $authHost.post('api/device', device)
    return data
}

export const getDevices = async (typeId, brandId, page, limit = 10) => {
    const {data} = await $host.get('api/device', {params: {
        typeId, brandId, page, limit
    }})
    return data
}

export const getDevice = async (id) => {
    const {data} = await $host.get(`api/device/${id}`)
    return data
}

export const updateDevice = async (deviceId, values, price) => {
    const {data} = await $authHost.put('api/device', {body: {
        deviceId, values, price
    }})
    return data;
}
