const Router = require('express');
const router = new Router();
const deviceController = require('../controllers/deviceController.js');

router.post('/', deviceController.create);
router.get('/', deviceController.getAll);
router.put('/', deviceController.updateDevice);
router.get('/:id', deviceController.getOne);

module.exports = router;