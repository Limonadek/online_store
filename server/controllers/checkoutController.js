const {Order} = require('../models/models.js'); 
const ApiError = require('../error/ApiError.js');

class CheckoutController {
    async createOrder(req, res, next) {
        try {
            const {userId, email, name, lastName, payment, address, totalPrice} = req.body

            const order = await Order.create({userId, email, name, lastName, payment, address, totalPrice});

            console.log(order);

            return res.json(order)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAllOrders(req, res, next) {
        try {
            const orders = await Order.findAll()

            return res.json(orders);
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

}

module.exports = new CheckoutController();