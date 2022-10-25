const express=require('express');
const path = require('path');
const router=express.Router();



router.get('/',function(req,res){
   
    let reqPath = path.join(__dirname, '../');
    alert("Your test request submitted successfully. Order number is "+orderno);
    res.redirect('/');
    
})






module.exports=router;