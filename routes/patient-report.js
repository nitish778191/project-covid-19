const express=require('express');
const bodyParser=require('body-parser');
const connection = require('../server/database');
const mysql=require('mysql');
// const moment = require("moment");
// import * as moment from 'moment'

const path = require('path');
const { time, table } = require('console');

const router=express.Router();



router.use(bodyParser.json())

router.use(bodyParser.urlencoded({extended: true}))





router.get('/patient-report',function(req,res){
   
    let reqPath = path.join(__dirname, '../');
    res.render('patient-report')
})



router.post('/patient-report',function(req,res){
    var data=req.body.serachdata;
    // JSON.stringify(data);
    // console.log(Object.keys(data));

    res.render('patient-report');
    // // var sql="select tbltestrecord.OrderNumber,tblpatients.FullName,tblpatients.MobileNumber,tbltestrecord.TestType,tbltestrecord.TestTimeSlot,tbltestrecord.RegistrationDate,tbltestrecord.id as testid from tbltestrecord join tblpatients on tblpatients.MobileNumber=tbltestrecord.PatientMobileNumber where (tblpatients.FullName = ? || tblpatients.MobileNumber= ? || tbltestrecord.OrderNumber= ? )";


    // // connection.query(sql,data,function(err,result){
    // //     if(err) throw err

    // //     console.log(result);
    //     res.render('patient-report',{records:result});
        

    // })
})






module.exports=router;