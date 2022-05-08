const { Router } = require('express');
const knex = require('../../db/');
const { tables } = require('../../db/constants');
const router = Router();
const categoriesSchema = require('./categoriesSchema');
router.get('/', async (req, res) => {
  try {
    const categories = await knex(tables.categories.NAME);
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get('/:id', async (req, res) => {
  try {
    const categorie = await knex
      .from(tables.categories.NAME)
      .where('id', req.params.id);
    res.json(categorie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post('/', async (req, res) => {
  try {
    await categoriesSchema.validate(req.body, { abortEarly: false });
    await knex(tables.categories.NAME).insert(req.body);
    const categories = await knex.from(tables.categories.NAME);
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.put('/:id', async (req, res) => {
  try {
    await categoriesSchema.validate(req.body, { abortEarly: false });
    await knex(tables.categories.NAME)
      .where('id', req.params.id)
      .update(req.body);
    const categories = await knex.from(tables.categories.NAME);
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.delete('/:id', (req, res) => {
  try {
    knex(tables.categories.NAME).where('id', req.params.id).del();
    const categories = knex.from(tables.categories.NAME);
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
        .join(
          tables.categories.NAME,
          tables.products.COLUMNS.CATEGORIES_ID,
          tables.categories.COLUMNS.ID,
        )
        .where('categories.slug', req.params.slug);
      res.json(products);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
