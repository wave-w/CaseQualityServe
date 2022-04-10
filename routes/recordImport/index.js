var express = require('express');
var router = express.Router();
const {
  china_regions,
  countries,
  notDiagnosedCaseList,
  diagnostic_details
} = require("../../utils/connectDatabase/connect");
const multer = require('multer');

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

router.post('/addrecord', (req, res) => {
  const patientData = JSON.parse(req.query.patientData);
  patientData.patientAge = Math.floor((Number(Date.now()) - Number(patientData.patientBirthDate)) / 31536000000);
  patientData.nativePlace = patientData.nativePlace.join('');
  notDiagnosedCaseList.create(patientData)
  res.send({
    success: true,
    patientData
  })
})

// 指定存储位置
const storage = multer.diskStorage({
  // 存储位置
  destination(req, file, callback) {
    // 参数一 错误信息   参数二  上传路径（此处指定upload文件夹）
    callback(null, "public/images")
  },
  // 确定文件名
  filename(req, file, cb) {
    const index = file.mimetype.indexOf('/') + 1 
    cb(null, `${Date.now()}${ req.query.inspectionNum}.${file.mimetype.slice(index)}`)
  }
})

// 得到multer对象  传入storage对象
const upload = multer({
  storage
})

router.post('/imageupload', upload.array("file"), (req, res) => {
  const image_list = req.files.map(item => `http://localhost:8080/images/${item.filename}`);
  diagnostic_details.create({
    inspectionNum: req.query.inspectionNum,
    image_list,
    ultrasonic_diagnosis: '',
    ultrasonic_findings: ''
  });
  res.send({
    success: true,
    imageurl: image_list
  })
})
module.exports = router;