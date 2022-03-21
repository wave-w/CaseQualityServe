var express = require('express');
var router = express.Router();
const {
  diagnosedCaseList, notDiagnosedCaseList
} = require("../../utils/connectDatabase/connect");

router.post('/diagnosedcaselist', (req, res) => {
  let findQuery = {}
  if (req.query.name) {
    findQuery = {
      $or: [{
          patientName: req.query.name
        },
        {
          inspectionDoctor: req.query.name
        }
      ]
    }
  }
  diagnosedCaseList.find(findQuery).limit(parseInt(req.query.pageSize))
    .skip(parseInt(req.query.pageSize) * parseInt(req.query.pageNum - 1)).sort({
      patientAge: req.query.ageSort,
      inspectionDate: req.query.dateSort
    }).exec((err, data) => {
      diagnosedCaseList.count((err, total) => {
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
          patientName: req.query.name
        },
        {
          inspectionDoctor: req.query.name
        }
      ]
    }
  }
  notDiagnosedCaseList.find(findQuery).limit(parseInt(req.query.pageSize))
    .skip(parseInt(req.query.pageSize) * parseInt(req.query.pageNum - 1)).sort({
      patientAge: req.query.ageSort,
      inspectionDate: req.query.dateSort
    }).exec((err, data) => {
      notDiagnosedCaseList.count((err, total) => {
        res.send({
          data,
          total
        })
      })
    })
});


router.post('/diagnosedPatientDetail', (req, res) => {
  diagnosedCaseList.find({inspectionNum: req.query.id},(err, data) => {
    console.log(req.query.id);
    console.log(data);
    res.send({data})
  })
});
module.exports = router;