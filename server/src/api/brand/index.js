const { Router } = require('express');

const router = Router();

const strings = require('../../utils/strings');
const status = require('../../utils/status');
const knex = require('../../db');
const constants = require('../../db/constants');

const yup = require('yup');
let schema = yup.object({
  name: yup.string().required(),
});

router.get('/', (req, res) => {
  knex.select().table(constants.tables.brands.NAME).then(brands=>{
    res.json(brands);
  })
});
router.post('/', async(req, res, next) => {
  let {name} = req.body;
  let slug = strings.slugify(name);
  try{
    await schema.validate(req.body, {abortEarly:false});
  }catch(err){
    return res.status(status.HTTP_400_BAD_REQUEST).json({msg:err.message})
  }
  try{
    await knex(constants.tables.brands.NAME).insert({name, slug}, 'id');
    res.sendStatus(status.HTTP_200_OK)
  }catch(err){
    res.status(status.HTTP_500_INTERNAL_SERVER_ERROR).json({msg:err.message});
  }
  
});
router.get('/:id', async(req, res) => {
  try{
    await knex(constants.tables.brands.NAME).where("id", '=', req.params.id).select();
    res.sendStatus(status.HTTP_200_OK);
  }catch(err){
    res.status(status.HTTP_500_INTERNAL_SERVER_ERROR).json({msg:err.message});
  }
});
router.put('/:id', async(req, res) => {
  let {name} = req.body;
  let slug = strings.slugify(name);
  try{
    schema.validate({name}, {abortEarly:false});
  }catch(err){
    return res.status(status.HTTP_400_BAD_REQUEST).json({msg:err.message})
  }
  try{
    await knex(constants.tables.brands.NAME).where("id", '=', req.params.id).update({name, slug});
    res.sendStatus(status.HTTP_200_OK);
  }catch(err){
    res.status(status.HTTP_500_INTERNAL_SERVER_ERROR).json({msg:err.message});
  }
});
router.delete('/:id',async (req, res) => {
  try{
    await knex(constants.tables.brands.NAME).where("id", '=', req.params.id).del();
    res.sendStatus(status.HTTP_200_OK);
  }catch(err){
    res.status(status.HTTP_500_INTERNAL_SERVER_ERROR).json({msg:err.message});
  }

});
router.get('/:slug/products', async(req, res) => {
  let products = await knex(constants.tables.products.NAME)
  .join(constants.tables.brands.NAME, `${constants.tables.products.NAME}.${constants.tables.brands.NAME}_id`, '=', `${constants.tables.brands.NAME}.id`).select();
  res.json({
    products
  });
});
module.exports = router;
