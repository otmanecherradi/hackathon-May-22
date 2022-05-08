const { Router } = require('express');

const frontendControllers = require('./frontend/');
const productsController = require('./products/');
const categoriesController = require('./categories/');
const ordersController = require('./orders/');
const usersController = require('./users/');
const authController = require('./auth/');
const brandController = require('./brand/');

const router = Router();

router.get('/', (req, res) => {
  res.json({
    msg: '💻 Welcome to the API 💻',
  });
});
router.use('/fn', frontendControllers);
router.use('/products', productsController);
router.use('/categories', categoriesController);
router.use('/orders', ordersController);
router.use('/users', usersController);
router.use('/auth', authController);
router.use('/brand', brandController);

module.exports = router;
