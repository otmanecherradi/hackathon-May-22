const { Router } = require('express');

const frontendControllers = require('./frontend/');

const router = Router();

router.get('/', (req, res) => {
  res.json({
    msg: '💻 Welcome to the API 💻',
  });
});

router.use('/fn', frontendControllers);

module.exports = router;
