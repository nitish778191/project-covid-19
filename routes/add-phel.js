const express=require('express');
const path = require('path');
const router=express.Router();
const bodyParser=require('body-parser');
const connection = require('../server/database');
const mysql=require('mysql');
const { time } = require('console');


router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: true}))






router.get('/add-phlebotomist',function(req,res){
   
    let reqPath = path.join(__dirname, '../');
    res.render('add-phlebotomist',{message:req.flash('message')})
})

router.post('/add-phlebotomist',function(req,res){
    var eid=req.body.empid;
    var fname=req.body.fullname;
    var mnumber=req.body.mobilenumber;
    //console.log(req.body);

    var value=[
        [eid,fname,mnumber]
    ];

    var sql="insert into tblphlebotomist(EmpID,FullName,MobileNumber) values ?"
    connection.query(sql,[value],function(error,result){
        if(error) throw error;
        req.flash('message','Added Successfully ')
        res.redirect('/dashboard')
       

    })

})







module.exports=router;