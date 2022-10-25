const express = require('express');
const bodyParser = require('body-parser');
const connection = require('../server/database');
const mysql = require('mysql');
// var busboy = require('connect-busboy');

const path = require('path');
const { time, table } = require('console');
const { json } = require('express/lib/response');

const router = express.Router();

// app.use(busboy());
//var fileUpload = require('express-fileupload')
//ar fileUpload=require('app/fileUpload')
global.fileUpload;
router.use(bodyParser.json())

router.use(bodyParser.urlencoded({ extended: true }))






router.get('/patient-report-details',function(req,res){
    testid = req.query.oid;
    var querya,queryb;

    var sql="select * from tbltestrecord join tblpatients on tblpatients.MobileNumber=tbltestrecord.PatientMobileNumber where  tbltestrecord.OrderNumber=?";
    const sqll = "select * from tblreporttracking join tbladmin on tbladmin.ID=tblreporttracking.RemarkBy where tblreporttracking.OrderNumber=?";

    connection.query(sql,[testid],function(err,result){
        if(err) throw err
        queryb=result;
       //console.log(queryb)
    })
    connection.query(sql,[testid],function(err,result){
        if(err ) throw err
        querya=result
        JSON.parse(JSON.stringify(querya))
        
        res.render('patient-report-details',{records:querya[0],testtracking:queryb})


    })

    // console.log("querya",querya);
    // console.log(queryb)
    
})







module.exports=router;