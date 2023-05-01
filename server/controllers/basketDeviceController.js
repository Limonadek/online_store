const {Basket, BasketDevice, Device} = require('../models/models.js'); 
const ApiError = require('../error/ApiError.js');
const { Op } = require('sequelize')

class BasketDeviceController {
    async addToBasket(req, res, next) {
        try {
            const { deviceId, userId } = req.body.body;

            const basket = await Basket.findOne(
                {
                    where: {userId}
                }
            );

            const {price} = await Device.findOne({
                where: {id: deviceId}
            })

            const basketDevice = await BasketDevice.create({deviceId, basketId: basket.id, totalPrice: price, inBasket: true});

            return res.json(basketDevice);
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }


    async getAll(req, res, next) {
        try {
            let {userId} = req.query;

            const basket = await Basket.findOne(
                {
                    where: {userId}
                }
            );

            const basketDevices = await BasketDevice.findAndCountAll({where: {basketId: basket.id}});

            let arrayDeviceId = [];

            basketDevices.rows.forEach(basketDevice => {
                arrayDeviceId.push(basketDevice.deviceId)
            });

            const devices = await Device.findAll({ 
                where: {
                    id: {
                        [Op.in]: arrayDeviceId
                    }
                },
                order: [ [ 'id', 'ASC' ] ]
            });

            return res.json(devices);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async chekInBasket(req, res, next) {
        try {
            const {userId, deviceId} = req.query;

            const basket = await Basket.findOne(
                {
                    where: {userId}
                }
            );

            const basketDevice = await BasketDevice.findOne({where: {basketId: basket.id, deviceId}});

            res.json(basketDevice);

        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async updateDeviceInBasket(req, res, next) {
        try {
            const {userId, deviceId, inBasket} = req.body.body;

            const basket = await Basket.findOne(
                {
                    where: {userId}
                }
            );

            BasketDevice.update({
                inBasket: inBasket,
            },
            {
                where: {
                    deviceId,
                    basketId: basket.id
                }
            })

        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async deleteBasketDevice(req, res, next) {
        try {
            let {userId, deviceId} = req.query;

            const basket = await Basket.findOne(
                {
                    where: {userId}
                }
            );

            const deleteDevice = await BasketDevice.destroy({where: {
                deviceId, basketId: basket.id
            }})
            return res.json(deleteDevice);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

}

module.exports = new BasketDeviceController();
