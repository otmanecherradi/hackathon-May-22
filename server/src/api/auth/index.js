const { Router } = require('express');

const router = Router();

router.post('/login', (req, res) => {
  res.json({
    msg: '💻 Welcome to the Login API - POST 💻',
  });
});
router.post('/token', (req, res) => {
  res.json({
    msg: '💻 Welcome to the token API - POST 💻',
  });
});
module.exports = router;
