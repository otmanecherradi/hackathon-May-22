const { Router } = require('express');

const router = Router();

const strings = require('../../utils/strings');
const status = require('../../utils/status');
const knex = require('../../db');
const constants = require('../../db/constants');

const yup = require('yup');
const LocalStorage = require('node-localStorage');
let localStorage = new LocalStorage();
let orderSchema = yup.object({
  address: yup.string().required(),
});
let orderDetailSchema = yup.object({
  product_id: yup.string().required(),
});
function validateUUID(uuid){
  let regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  regex.test(uuid);
}

router.get('/', async(req, res) => {
  let orders = await knex(constants.tables.orders.NAME).select();

  for(order of orders){
    order.orderDetails = await knex(constants.tables.orderDetails.NAME).where(`${constants.tables.orders.NAME}_id`, '=', order.id).select();
  }
  res.json({
    orders
  });
});
router.post('/', async (req, res) => {
  try{
    await orderSchema.validate(req.body);
  }catch{
    return res.sendStatus(status.HTTP_400_BAD_REQUEST);
  }

  let uuid = strings.uuidv4();
  let user_id = strings.uuidv4();

  try{
    await knex(constants.tables.orders.NAME).insert({
      id:uuid,
      user_id: user_id,
      created_at: new Date().toLocaleString(),
      address: req.body.address
    });
    let orderDetails = localStorage.getItem('orderDetails');
    for(detail of orderDetails){
      detail.order_id = uuid;
      detail.price = await knex(constants.tables.products.NAME)
      .where(`${constants.tables.products.NAME}_id`, '=', detail.product_id)
      .first('price');
      return detail;
    }
    await knex(constants.tables.orderDetails.NAME).insert(orderDetails);
    res.sendStatus(status.HTTP_201_CREATED);
  }catch(err){
    res.status(status.HTTP_500_INTERNAL_SERVER_ERROR).json({msg:err.message});
  }
 
});
// router.put('/:id', (req, res) => {
//   res.json({
//     msg: `💻 Welcome to the orders API - PUT ${req.params.id}💻`,
//   });
// });
router.delete('/:id', async(req, res) => {
  try{
    await knex('orders').where(`${constants.tables.orders.NAME}_id`, '=', req.params.id).del();
  //details delete on cascade according to db/utils.js @ constructForeignKey
    res.sendStatus(status.HTTP_200_OK); 
  }catch{
    res.sendStatus(status.HTTP_500_INTERNAL_SERVER_ERROR);
  }
});

module.exports = router;
