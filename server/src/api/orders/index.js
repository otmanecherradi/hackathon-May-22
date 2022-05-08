const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
  res.json({
    msg: '💻 Welcome to the orders API 💻',
  });
});
router.post('/', (req, res) => {
  res.json({
    msg: '💻 Welcome to the orders API - POST 💻',
  });
});
router.put('/:id', (req, res) => {
  res.json({
    msg: `💻 Welcome to the orders API - PUT ${req.params.id}💻`,
  });
});
router.delete('/:id', (req, res) => {
  res.json({
    msg: `💻 Welcome to the orders API - DELETE ${req.params.id}💻`,
  });
});

module.exports = router;
