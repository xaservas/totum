const fetch = require('node-fetch');
const metaDatamapper = require('../models/metaDatamapper');

const revertGeo = {
  revertGeo: async (data) => {
    try {
      const response = await fetch(
        `http://api.positionstack.com/v1/forward?access_key=${process.env.API_GEO}&query=${data}`
      );
      const json = await response.json();
      const landmark = [json.data[0].latitude, json.data[0].longitude];
      return landmark;
    } catch (error) {
      throw new Error(error);
    }
  },
};

module.exports = revertGeo;
