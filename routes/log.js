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






router.get('/log',function(req,res){
   
    let reqPath = path.join(__dirname, '../');
    res.render('log')
})



router.post('/log',function(req,res){
    
        
    var uid=req.body.username;
    var pwd=req.body.inputpwd;
    console.log(uid,pwd)
    var values=[
        uid,pwd
    ]


    var sql="select ID from tbladmin where  AdminuserName=? && Password=?";
    connection.query(sql,values,function(err,result){
        if(err) throw err
        if(result>0)
            res.render('dashboard');


    })
    
})






module.exports=router;