const uuid = require('uuid');
const path = require('path');
const {Device, DeviceInfo} = require('../models/models.js'); 
const ApiError = require('../error/ApiError.js');

class DeviceController {
    async create(req, res, next) {
        try {
            let {name, price, brandId, typeId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const device = await Device.create({name, price, brandId, typeId, img: fileName, totalPrice: price});

            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                )
            }

            return res.json(device)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        let {brandId, typeId, limit, page} = req.query;
        page = page || 1;
        limit = limit || 10;
        let offset = page * limit - limit;
        let devices;

        if (!brandId && !typeId) {
            devices = await Device.findAndCountAll({limit, offset});
        }
        if (brandId && !typeId) {
            devices = await Device.findAndCountAll({where: {brandId}, limit, offset});
        }
        if (!brandId && typeId) {
            devices = await Device.findAndCountAll({where: {typeId}, limit, offset});
        }
        if (brandId && typeId) {
            devices = await Device.findAndCountAll({where: {typeId, brandId}, limit, offset});
        }
        return res.json(devices);
    }

    async getOne(req, res) {
        const {id} = req.params;
        const device = await Device.findOne(
            {
                where: {id},
                include: [{model: DeviceInfo, as: 'info'}]
            }
        );
        return res.json(device);
    }

    async updateDevice(req, res) {
        const {deviceId, values, price} = req.body.body;

            Device.update({
                allValues: values,
                totalPrice: price,
            },
            {
                where: {
                    id: deviceId
                },
                returning: true,
                plain: true
            }).then(data => {
                console.log(data[1].dataValues);
                res.json(data[1].dataValues);
            })
    }

}

module.exports = new DeviceController();