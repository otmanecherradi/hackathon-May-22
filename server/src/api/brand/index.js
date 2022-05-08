const { Router } = require('express');

const router = Router();
router.get('/', (req, res) => {
  res.json({
    msg: '💻 Welcome to the brand API 💻',
  });
});
router.post('/', (req, res) => {
  res.json({
    msg: '💻 Welcome to the brand API - POST 💻',
  });
});
router.put('/:id', (req, res) => {
  res.json({
    msg: `💻 Welcome to the brand API - PUT ${req.params.id}💻`,
  });
});
router.delete('/:id', (req, res) => {
  res.json({
    msg: `💻 Welcome to the brand API - DELETE ${req.params.id}💻`,
  });
});
router.get('/:slug/products', (req, res) => {
  res.json({
    msg: '💻 get the products in a brand API 💻',
  });
});
module.exports = router;
