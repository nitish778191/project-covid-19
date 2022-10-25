const express=require('express');
const path = require('path')


const router=express.Router();








router.get('/logout',function(req,res){
   
    let reqPath = path.join(__dirname, '../');
    res.render('logout')
})





module.exports=router;