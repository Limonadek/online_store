import { $authHost } from "./index.js";

export const createOrder = async (order) => {
    const {data} = await $authHost.post('api/checkout', order)
    return data
}

export const gerOrders = async () => {
    const {data} = await $authHost.get('api/checkout')
    return data
}   