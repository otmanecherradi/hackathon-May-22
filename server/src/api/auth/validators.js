const yup = require('yup');

const signupSchema = yup.object({
  fullName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const loginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const tokenSchema = yup.object({
  refreshToken: yup.string().required(),
});

module.exports = {
  signupSchema,
  loginSchema,
  tokenSchema,
};
