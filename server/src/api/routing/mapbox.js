const mbxClient = require('@mapbox/mapbox-sdk');
const mbxDirections = require('@mapbox/mapbox-sdk/services/directions');

const env = require('../../env');

const baseClient = mbxClient({ accessToken: env.MAPBOX_ACCESS_TOKEN });
const mbxDirectionService = mbxDirections(baseClient);

module.exports = {
  mbxDirectionService,
};
