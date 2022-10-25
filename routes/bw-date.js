const express=require('express');
const path = require('path')


const router=express.Router();








router.get('/bwdates-report-ds',function(req,res){
   
    let reqPath = path.join(__dirname, '../');
    res.render('bwdates-report-ds')
})





module.exports=router;