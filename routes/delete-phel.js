const express=require('express');
const bodyParser=require('body-parser');
const connection = require('../server/database');
const mysql=require('mysql');
//const moment = require("moment");
// const flash = require('express-flash');

const path = require('path');
const { time, table } = require('console');
const exp = require('constants');
//const db=require('../sever/database');
//const connection = require('./database');

const router=express.Router();
router.use(bodyParser.json())

router.use(bodyParser.urlencoded({extended: true}))




router.get('/delete-phle',function(req,response){



   
    let reqPath = path.join(__dirname, '../');

    var ac=req.query.action;
    console.log(req.query);
    var empid=req.query.pid;
    console.log(ac,empid);

    var sql="select * from tblphlebotomist where id=?";
    var sqll="delete from tblphlebotomist where id=? ";
    connection.query(sql,empid,function(err,res){
        if(err) throw err
        response.render('delete-phle',{records:res[0]});


    })

    var sqll="delete from tblphlebotomist where id=? ";

    connection.query(sqll,empid,function(err,ress){
        if(err) throw err
    })
//     const sql="select * from tbltestrecord join tblpatients on tblpatients.MobileNumber=tbltestrecord.PatientMobileNumber where  tbltestrecord.OrderNumber=?"
    
//     connection.query(sql,[testid],function(err,res) {
//         if(err) throw err
        
//         JSON.parse(JSON.stringify(res))
        
//         var n=res.length;
//         // console.log("hello\n\n")
//         // //console.log(res);
//         // console.log("hello\n\n")
//         console.log(res[0].MobileNumber,res[0].DateOfBirth);
//         response.render('test-details',{records:res[0]});


// })
})


module.exports=router;