const express=require('express');
const bodyParser=require('body-parser');
const connection = require('../server/database');
const mysql=require('mysql');
const path = require('path');
const { time } = require('console');
const router=express.Router();

router.use(bodyParser.urlencoded({extended: true}))
router.use(bodyParser.json())



router.get('/search-report',function(req,res){
   
    let reqPath = path.join(__dirname, '../');
    res.render('search-report')
})

router.post('/search-report',function(req,res){
    var data=req.body.serachdata;
    JSON.stringify(data)
    console.log(data);

    var value=[
        [data,data,data]
    ]


    var sql="select tbltestrecord.OrderNumber,tblpatients.FullName,tblpatients.MobileNumber,tbltestrecord.TestType,tbltestrecord.TestTimeSlot,tbltestrecord.RegistrationDate,tbltestrecord.id as testid from tbltestrecord join tblpatients on tblpatients.MobileNumber=tbltestrecord.PatientMobileNumber where (tblpatients.FullName =? or tblpatients.MobileNumber= ? or tbltestrecord.OrderNumber = ? )";
    connection.query(sql,[data,data,data],function(err,result){
        if(err ) throw err
        res.render('search-report-result',{records:result})
    })
})




module.exports=router;