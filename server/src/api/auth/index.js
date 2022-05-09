const { Router } = require('express');

const bcrypt = require('bcrypt');

const knex = require('../../db');
const { tableNames } = require('../../db/constants');

const status = require('../../utils/status');

const env = require('../../env');

const {
  signupSchema,
  signInSchema,
  tokenSchema,
} = require('./schema-validators');
const jwtUtils = require('./jwt');

const router = Router();

router.post('/signup', async (req, res, next) => {
  const data = req.body;

  try {
    const validatedData = await signupSchema.validate(data, {
      abortEarly: false,
    });

    const userExists = await knex(tableNames.users)
      .where({
        email: validatedData.email,
      })
      .first();

    if (userExists) {
      res.send({ msg: 'user already exists' });
    }

    const salt = await bcrypt.genSalt(parseInt(env.ROUNDS));
    const hashedPassword = await bcrypt.hash(validatedData.password, salt);

    const newUser = await knex(tableNames.users).insert({
      email: validatedData.email,
      password: hashedPassword,
      full_name: validatedData.fullName,
      address: validatedData.address,
      phone: validatedData.phone,
    });

    res.status(status.HTTP_201_CREATED);
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  const data = req.body;

  try {
    const validatedData = await signInSchema.validate(data, {
      abortEarly: false,
    });

    const user = await knex(tableNames.users)
      .where({
        email: validatedData.email,
      })
      .first();

    if (!user) {
      res.send({ msg: 'user does not exists' });
    }

    const correctPassword = await bcrypt.compare(
      validatedData.password,
      user.password,
    );

    if (!correctPassword) {
      res.send({ msg: 'credentials error' });
    }

    res.json({
      token: jwtUtils.getToken({ id: user.id }),
    });
  } catch (error) {
    next(error);
  }
});

router.post('/token', async (req, res, next) => {
  const data = req.body;

  try {
    const validatedData = await tokenSchema.validate(data, {
      abortEarly: false,
    });

    const { id } = jwtUtils.verifyToken(validatedData.token);

    const user = await knex(tableNames.users)
      .where({
        id,
      })
      .first();

    if (!user) {
      res.send({ msg: 'user does not exists' });
    }

    res.json({
      token: jwtUtils.getToken({ id: user.id }),
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
