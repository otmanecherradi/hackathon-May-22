const { Router } = require('express');

const frontendControllers = require('./frontend/');
const authControllers = require('./auth/');

const router = Router();

router.get('/', (req, res) => {
  res.json({
    msg: '💻 Welcome to the API 💻',
  });
});

router.use('/fn', frontendControllers);
router.use('/auth', authControllers);

module.exports = router;
