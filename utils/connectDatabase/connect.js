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
  gender: String,
  age: String,
  hospital: String,
  phoneNum: String,
  title: String,
  hospital_logo: String,
}));

const diagnosedCaseList = mongoose.model('diagnosed_case_lists', mongoose.Schema({
  inspectionNum: String,
  patientName: String,
  patientSex: String,
  patientAge: String,
  hospital: String,
  nationality: String,
  nation: String,
  inspectionDoctor: String,
  inspectionDate: String,
  patientBirthDate: String,
  nativePlace: String,
},{versionKey: false}));


const notDiagnosedCaseList = mongoose.model('not_diagnosed_case_lists', mongoose.Schema({
  inspectionNum: String,
  patientName: String,
  patientSex: String,
  patientAge: String,
  hospital: String,
  nationality: String,
  nation: String,
  inspectionDoctor: String,
  inspectionDate: String,
  patientBirthDate: String,
  nativePlace: String,
},{versionKey: false}));

const diagnostic_details = mongoose.model('diagnostic_details', mongoose.Schema({
  inspectionNum: String,
  image_list: Array,
  ultrasonic_diagnosis: String,
  ultrasonic_findings: String
},{versionKey: false}));

const china_regions = mongoose.model('china_regions', mongoose.Schema({
  code: String,
  name : String,
  province: String,
  children: Array,
}));

// inset(notDiagnosedCaseList);
module.exports = {
  doctorList,
  diagnosedCaseList,
  notDiagnosedCaseList,
  diagnostic_details,
  china_regions
};