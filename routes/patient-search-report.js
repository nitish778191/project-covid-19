const express=require('express');
const bodyParser=require('body-parser');
const connection = require('../server/database');
const mysql=require('mysql');
const path = require('path');
const { time } = require('console');
const router=express.Router();


router.use(bodyParser.urlencoded({extended: true}))
router.use(bodyParser.json())

router.get('/patient-search-report',function(req,res){
    res.render('patient-search-report');

})

router.post('/patient-search-report',function(req,res){
    console.log("heloo");
    var data=req.body.searchdata;

     var sql="select tbltestrecord.OrderNumber,tblpatients.FullName,tblpatients.MobileNumber,tbltestrecord.TestType,tbltestrecord.TestTimeSlot,tbltestrecord.RegistrationDate,tbltestrecord.id as testid from tbltestrecord join tblpatients on tblpatients.MobileNumber=tbltestrecord.PatientMobileNumber where (tblpatients.FullName =? or tblpatients.MobileNumber =? or tbltestrecord.OrderNumber =?)"
     connection.query(sql,[data,data,data],function(err,result){
         if(err) throw err
         console.log(result)
         res.render('patient-report',{records:result,data:data})
     })
         

})









module.exports = router;