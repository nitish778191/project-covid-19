const express=require('express');
const path = require('path');
const router=express.Router();








router.get('/old-testing',function(req,res){
   
    let reqPath = path.join(__dirname, '../');
    res.render('old-testing')
})





module.exports=router;