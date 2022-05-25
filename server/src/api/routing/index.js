const { Router } = require('express');

const { routesSchema } = require('./validators');

const status = require('../../utils/status');
const { mbxDirectionService } = require('./mapbox');

const router = Router();

router.get('/routes', async (req, res, next) => {
  try {
    const validatedData = await routesSchema.validate(req.query, {
      abortEarly: false,
    });

    const { body: reres } = await mbxDirectionService
      .getDirections({
        profile: 'driving-traffic',
        waypoints: [
          {
            coordinates: [
              validatedData.departureLat,
              validatedData.departureLng,
            ],
            approach: 'driving_side',
          },
          {
            coordinates: [validatedData.arrivalLat, validatedData.arrivalLng],
            approach: 'driving_side',
          },
        ],
      })
      .send();

    console.log({ reres });

    return res.status(status.HTTP_201_CREATED).json(reres);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
