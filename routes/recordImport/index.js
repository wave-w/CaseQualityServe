var express = require('express');
var router = express.Router();
const { china_regions, countries } = require("../../utils/connectDatabase/connect");
router.get('/chinaregions', (req, res) => {
  china_regions.find((err, china_regions) => {
    countries.find((err, countries) => {
      res.send({
        china_regions,
        countries
      })
    })
  })
})

module.exports = router;