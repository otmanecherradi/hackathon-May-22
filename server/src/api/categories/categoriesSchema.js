const yup = require('yup');

const categoriesSchema = yup.object({
  name: yup.string().min(4).max(254).required(),
  slug: yup.string().required(),
});
module.exports = categoriesSchema;
