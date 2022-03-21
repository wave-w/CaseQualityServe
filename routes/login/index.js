let express = require('express');
let router = express.Router();
const { doctorList } = require("../../utils/connectDatabase/connect");
const sendEmail = require("../../utils/sendEmail")
const rendomString = require("../../utils/RandomString")

let verificationCode = '';
router.post('/getCode', (req, res) => {
  verificationCode = Number(new Date()).toString().slice(9, 14)
  doctorList.find({
    email: req.query.email,
    passWord: req.query.passWord
  }, (err, data) => {
    if (data.length) {
      sendEmail(verificationCode, req.query.email)
      res.send({
        data: data[0],
        success: true
      });
      setTimeout(() => {
        verificationCode = '';
      }, 300000);
    } else {
      res.send({
        success: false
      })
    }
  })
});

router.post('/login', (req, res) => {
  const token = Math.random().toString(36).slice(2);
  if (req.query.code === verificationCode) {
    res.send({
      success: true,
      token: rendomString
    })
  } else {
    res.send({
      success: false
    })
  }
})

router.post('/logout', (req, res) => {
  verificationCode = '';
  res.send({
    success: true
  })
})
module.exports = router;