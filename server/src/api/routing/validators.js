const yup = require('yup');

const routesSchema = yup.object({
  departureLat: yup.number().required(),
  departureLng: yup.number().required(),
  arrivalLat: yup.number().required(),
  arrivalLng: yup.number().required(),
});

module.exports = {
  routesSchema,
};
