const yup = require('yup');

const signupSchema = yup.object({
  fullName: yup.string().required(),
  email: yup.string().email().required().lowercase(),
  password: yup.string().required(),
  address: yup.string().nullable(),
  phone: yup.string().nullable(),
});

const signInSchema = yup.object({
  email: yup.string().email().required().lowercase(),
  password: yup.string().required(),
});

const tokenSchema = yup.object({
  token: yup.string().required(),
});

module.exports = {
  signupSchema,
  signInSchema,
  tokenSchema,
};
