const Router = require('express');
const router = new Router();
const basketDeviceController = require('../controllers/basketDeviceController.js');

router.post('/', basketDeviceController.addToBasket);
router.get('/', basketDeviceController.getAll);
router.get('/:id', basketDeviceController.chekInBasket);
router.put('/', basketDeviceController.updateDeviceInBasket)
router.delete('/', basketDeviceController.deleteBasketDevice);

module.exports = router;