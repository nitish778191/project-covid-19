const express = require('express');
const bodyParser = require('body-parser');
const connection = require('../server/database');
const mysql = require('mysql');
// const moment = require("moment");
// import * as moment from 'moment'

const path = require('path');
const { time, table } = require('console');

const router = express.Router();



router.use(bodyParser.json())

router.use(bodyParser.urlencoded({ extended: true }))






router.get('/search-report-result', function (req, res) {

    let reqPath = path.join(__dirname, '../');
    res.render('search-report-result')
})



// router.post('/search-report-result',function(req,res){
//     // var data=req.body.serachdata;
//     // console.log(data);
//     // var sql="select tbltestrecord.OrderNumber,tblpatients.FullName,tblpatients.MobileNumber,tbltestrecord.TestType,tbltestrecord.TestTimeSlot,tbltestrecord.RegistrationDate,tbltestrecord.id as testid from tbltestrecord join tblpatients on tblpatients.MobileNumber=tbltestrecord.PatientMobileNumber where (tblpatients.FullName = ? || tblpatients.MobileNumber= ? || tbltestrecord.OrderNumber= ? )";


//     // connection.query(sql,data,function(err,result){
//     //     if(err) throw err

//     //     console.log(result);
//     //     res.render('search-report-result',{records:result});


//     })
// })






module.exports = router;