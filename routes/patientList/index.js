var express = require('express');
var router = express.Router();
const {
  diagnosedCaseList, notDiagnosedCaseList, diagnostic_details
} = require("../../utils/connectDatabase/connect");

router.post('/diagnosedcaselist', (req, res) => {
  let findQuery = {}
  if (req.query.name) {
    findQuery = {
      $or: [{
          patientName: {$regex: req.query.name}
        },
        {
          inspectionDoctor: {$regex: req.query.name}
        }
      ]
    }
  }
  diagnosedCaseList.find(findQuery).limit(parseInt(req.query.pageSize))
    .skip(parseInt(req.query.pageSize) * parseInt(req.query.pageNum - 1)).sort({
      patientAge: req.query.ageSort,
      inspectionDate: req.query.dateSort
    }).exec((err, data) => {
      diagnosedCaseList.find(findQuery).count((err, total) => {
        res.send({
          data,
          total
        })
      })
    })
});

router.post('/notdiagnosedcaselist', (req, res) => {
  let findQuery = {}
  if (req.query.name) {
    findQuery = {
      $or: [{
          patientName:{$regex: req.query.name}
        },
        {
          inspectionDoctor:{$regex: req.query.name}
        }
      ]
    }
  }
  notDiagnosedCaseList.find(findQuery).limit(parseInt(req.query.pageSize))
    .skip(parseInt(req.query.pageSize) * parseInt(req.query.pageNum - 1)).sort({
      patientAge: req.query.ageSort,
      inspectionDate: req.query.dateSort
    }).exec((err, data) => {
      notDiagnosedCaseList.find(findQuery).count((err, total) => {
        res.send({
          data,
          total
        })
      })
    })
});


router.post('/diagnosedPatientDetail', (req, res) => {
  diagnosedCaseList.find({inspectionNum: req.query.id},(err, data) => {
    diagnostic_details.find({ inspectionNum: req.query.id }, (detailerr, detail) => {
      let reaData = {
        inspectionNum: data[0].inspectionNum,
        patientName: data[0].patientName,
        patientSex: data[0].patientSex,
        patientAge: data[0].patientAge,
        hospital: data[0].hospital,
        nationality: data[0].nationality,
        nation: data[0].nation,
        inspectionDoctor: data[0].inspectionDoctor,
        inspectionDate: data[0].inspectionDate,
        patientBirthDate: data[0].patientBirthDate,
        nativePlace: data[0].nativePlace,
        image_list: detail[0].image_list,
        ultrasonic_diagnosis: detail[0].ultrasonic_diagnosis,
        ultrasonic_findings: detail[0].ultrasonic_findings
      };
      res.send(reaData);
    })
  })
});
module.exports = router;