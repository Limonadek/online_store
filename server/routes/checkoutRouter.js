const Router = require('express');
const router = new Router();
const checkoutController = require('../controllers/checkoutController.js');

router.post('/', checkoutController.createOrder);
router.get('/', checkoutController.getAllOrders);

module.exports = router;