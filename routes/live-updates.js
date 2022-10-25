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



router.get('/live-updates',function(req,res){
   
    let reqPath = path.join(__dirname, '../');
    console.log(reqPath)

    
    var sql="  select  tblpatients.State as state,count(tbltestrecord.id) as totaltest from tbltestrecord join tblpatients on tblpatients.MobileNumber=tbltestrecord.PatientMobileNumber group by tblpatients.State";
  connection.query(sql,function(err,result){
      if(err) throw err
      res.render('live-updates',{records:result})


    })
})
module.exports=router;