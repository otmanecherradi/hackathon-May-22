const { Router } = require('express');

const router = Router();
router.get('/', (req, res) => {
  res.json({
    msg: '💻 Welcome to the users API 💻',
  });
});
router.post('/', (req, res) => {
  res.json({
    msg: '💻 Welcome to the users API - POST 💻',
  });
});
router.put('/:id', (req, res) => {
  res.json({
    msg: `💻 Welcome to the users API - PUT ${req.params.id}💻`,
  });
});
router.delete('/:id', (req, res) => {
  res.json({
    msg: `💻 Welcome to the users API - DELETE ${req.params.id}💻`,
  });
});
module.exports = router;
