const { stringify } = require("jade/lib/utils");
const mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/hospital_data');
const inset = require("../inset")
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("连接成功");
});

const doctorList = mongoose.model('doctor_accounts', mongoose.Schema({
  email: String,
  passWord: String,
  doctorName: String,
  phoneNum: String,
  title: String
}));

const diagnosedCaseList = mongoose.model('diagnosed_case_lists', mongoose.Schema({
  inspectionNum: String,
  patientName: String,
  patientSex: String,
  patientAge: Number,
  nation: String,
  nationality: String,
  nativePlace: String,
  inspectionDate: Date,
  patientBirthDate: Date,
  inspectionDoctor: String
},{versionKey: false}));


const notDiagnosedCaseList = mongoose.model('not_diagnosed_case_lists', mongoose.Schema({
  inspectionNum: String,
  patientName: String,
  patientSex: String,
  patientAge: Number,
  nationality: String,
  nation: String,
  nativePlace: String,
  inspectionDate: Date,
  patientBirthDate: Date,
  inspectionDoctor: String
},{versionKey: false}));

// inset(diagnosedCaseList);
module.exports = {
  doctorList,
  diagnosedCaseList,
  notDiagnosedCaseList
};