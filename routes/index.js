const express=require('express');
const path = require('path')


const router=express.Router();








router.get('/index',function(req,res){
   
    let reqPath = path.join(__dirname, '../');
    console.log(reqPath)
    res.render('index')
})





module.exports=router;