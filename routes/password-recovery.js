const express=require('express');
const bodyParser=require('body-parser');
const connection = require('../server/database');
const mysql=require('mysql');
const path = require('path');
const { time } = require('console');
const router=express.Router();

router.use(bodyParser.urlencoded({extended: true}))
router.use(bodyParser.json())

router.get('/password-recovery',function(req,response){
   
    let reqPath = path.join(__dirname, '../');
    response.render('password-recovery',{message:req.flash('message')});
    
    

})

router.post('/password-recovery',function(req,res){
    var uname=req.body.username;
    var cnumber=req.body.contactno;
    var npass=req.body.newpassword;
    var cpass=req.body.confirmpassword;
   if(npass !== cpass)
   {
       req.flash('message','Password And confirm password not matched')
       res.redirect('/password-recovery')
   }


   var sql="select ID from tbladmin where  AdminuserName=? and MobileNumber=?";
   
   connection.query(sql,[uname,cnumber],function(err,result){
       if(err) throw err
       JSON.stringify(result);
       console.log(result)
       
       if(result>0)
       {
        var sqll="update tbladmin set Password=?  where  AdminuserName=? && MobileNumber=?";
        connection.query(sqll,[npass,uname,cnumber],function(err,resultt){
            if(err) throw err

            req.flash('message','Updated Succesfully')
            res.redirect('/password-recovery')

        })
       }
       else
       {
        req.flash('message','Invalid credentials')
        res.redirect('/password-recovery')

       }
   })
})





module.exports=router;