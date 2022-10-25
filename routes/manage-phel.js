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




router.get('/manage-phlebotomist',function(req,response){
   
    let reqPath = path.join(__dirname, '../');
    var sql="select * from tblphlebotomist";
    connection.query(sql,function(err,res) {
        if(err) throw err
        //console.log(JSON.stringify(res));
        
        JSON.stringify(res)
        var n=res.length;
       // console.log(n);
        // for(i=0;i<n;i++){
        //     console.log(res[i].OrderNumber,res[i].FullName,res[i].MobileNumber,res[i].TestType,res[i].testid);
        // }
        //console.log(res[0].FullName)
        response.render('manage-phlebotomist',{records:res})
    })
        
     })

    
    //  router.post('/manage-phlebotomist',function(req,res){
    //      var ac=req.query.action;
    //      console.log(ac);

    //  })





module.exports=router;