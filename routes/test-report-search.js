const express=require('express');
const path = require('path');
const router=express.Router();








router.get('/patient-search-report',function(req,res){
   
    let reqPath = path.join(__dirname, '../');
    res.render('patient-search-report')
})





module.exports=router;