const { Router } = require('express');

const { signupSchema, loginSchema, tokenSchema } = require('./validators');
const {
  getUserByEmail,
  getHashedPassword,
  createNewUser,
  getUserTokens,
  checkPassword,
  getUserFromAuthAccessToken,
  getUserIdFromRefreshToken,
} = require('./services');

const status = require('../../utils/status');
const { checkAuthMiddleware } = require('./middleware');

const router = Router();

router.post('/signup', async (req, res, next) => {
  try {
    const validatedData = await signupSchema.validate(req.body, {
      abortEarly: false,
    });

    const userExists = await getUserByEmail(validatedData.email);

    if (userExists) {
      return next(new Error('user already exists'));
    }

    const hashedPassword = await getHashedPassword(validatedData.password);

    const newUser = {
      full_name: validatedData.fullName,
      email: validatedData.email,
      password: hashedPassword,
      // role_id: 2,
    };

    const [id] = await createNewUser(newUser).returning('id');

    const tokens = getUserTokens({ id });

    return res.status(status.HTTP_201_CREATED).json(tokens);
  } catch (err) {
    return next(err);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const validatedData = await loginSchema.validate(req.body, {
      abortEarly: false,
    });

    const user = await getUserByEmail(validatedData.email);
    if (!user) {
      return next(new Error('user does not exist'));
    }

    const matchPassword = await checkPassword(
      validatedData.password,
      user.password,
    );

    if (!matchPassword) {
      return next(new Error('wrong credentials'));
    }

    const tokens = getUserTokens({ id: user.id });

    return res.status(status.HTTP_200_OK).json(tokens);
  } catch (err) {
    return next(err);
  }
});

router.post('/token', checkAuthMiddleware(), async (req, res, next) => {
  try {
    const validatedData = await tokenSchema.validate(req.body, {
      abortEarly: false,
    });

    const user = await getUserFromAuthAccessToken(req);
    if (!user) {
      return next(new Error('user type error'));
    }

    const { userId: RTUserId, type: RTType } = getUserIdFromRefreshToken(
      validatedData.refreshToken,
    );

    if (RTType !== 'refresh') {
      return next(new Error('token type error'));
    }

    if (user.id !== +RTUserId) {
      return next(new Error('not allowed'));
    }

    const tokens = getUserTokens({ id: user.id });
    return res.status(status.HTTP_200_OK).json(tokens);
  } catch (err) {
    return next(err);
  }
});

router.get('/me', checkAuthMiddleware(), async (req, res, next) => {
  try {
    const user = await getUserFromAuthAccessToken(req);
    if (!user) {
      return next(new Error('user type error'));
    }

    return res.status(status.HTTP_200_OK).json({
      id: user.id,
      fullName: user.full_name,
      email: user.email,
      roleId: user.role_id,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
      deletedAt: user.deleted_at,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
