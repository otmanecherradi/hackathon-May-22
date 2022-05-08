const { Router } = require('express');
const knex = require('../../db/');
const { tableNames } = require('../../db/constants');
const router = Router();

router.get('/', async (req, res) => {
  try {
    const categories = await knex(tableNames.categories);
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get('/:id', async (req, res) => {
  try {
    const categorie = await knex
      .from(tableNames.categories)
      .where('id', req.params.id);
    res.json(categorie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post('/', async (req, res) => {
  try {
    await knex(tableNames.categories).insert(req.body);
    const categories = await knex.from(tableNames.categories);
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.put('/:id', async (req, res) => {
  try {
    await knex(tableNames.categories)
      .where('id', req.params.id)
      .update(req.body);
    const categories = await knex.from(tableNames.categories);
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.delete('/:id', (req, res) => {
  try {
    knex(tableNames.categories).where('id', req.params.id).del();
    const categories = knex.from(tableNames.categories);
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get('/:slug/products', async (req, res) => {
  try {
    const reg =
      '/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i';
    const regExp = new RegExp(reg);
    if (regExp.exec(req.params.slug)) {
      const products = await knex
        .from('products')
        .where('categories_id', req.params.slug);
      res.json(products);
    } else {
      const products = await knex
        .from('products')
        .join('categories', 'products.categories_id', 'categories.id')
        .where('categories.slug', req.params.slug);
      res.json(products);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
