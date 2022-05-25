const { Router } = require('express');

const frontendControllers = require('./frontend/');
const authControllers = require('./auth/');

const routingControllers = require('./routing/');

const router = Router();

router.get('/', (req, res) => {
  res.json({
    msg: '💻 Welcome to the API 💻',
  });
});

router.use('/fn', frontendControllers);
router.use('/auth', authControllers);
router.use('/routing', routingControllers);

module.exports = router;
