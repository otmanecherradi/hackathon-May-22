const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
  res.json({
    msg: '💻 Welcome to the categories API 💻',
  });
});
router.post('/', (req, res) => {
  res.json({
    msg: '💻 Welcome to the categories API - POST 💻',
  });
});
router.put('/:id', (req, res) => {
  res.json({
    msg: `💻 Welcome to the categories API - PUT ${req.params.id}💻`,
  });
});
router.delete('/:id', (req, res) => {
  res.json({
    msg: `💻 Welcome to the categories API - DELETE ${req.params.id}💻`,
  });
});
router.get('/:slug/products', (req, res) => {
  res.json({
    msg: '💻 get slug products API 💻',
  });
});
module.exports = router;
