var express = require('express');
var router = express.Router();
const { china_regions } = require("../../utils/connectDatabase/connect");
router.get('/china_regions', (req, res) => {
  china_regions.find((err, data) => {
    res.send(data)
  })
})

module.exports = router;