// var assert = require('assert');
// var jsdom = require('mocha-jsdom');

// global.document = jsdom();
const express=require('express');
const bodyParser=require('body-parser');
const connection = require('../server/database');
const mysql=require('mysql');
//const moment = require("moment");
// const flash = require('express-flash');

const path = require('path');
const { time, table } = require('console');
//const db=require('../sever/database');
//const connection = require('./database');

const router=express.Router();
router.use(bodyParser.json())

router.use(bodyParser.urlencoded({extended: true}))

// var jsdom = require("jsdom");
// var JSDOM = jsdom.JSDOM;


// app.use((req, res, next)=>{
//     res.locals.moment = moment;
//     next();
//   });

router.get('/all-test',function(req,response){
   
    let reqPath = path.join(__dirname, '../');
    
    const sql="select tbltestrecord.OrderNumber,tblpatients.FullName,tblpatients.MobileNumber,tbltestrecord.TestType,tbltestrecord.TestTimeSlot,tbltestrecord.RegistrationDate,tbltestrecord.id as testid from tbltestrecord join tblpatients on tblpatients.MobileNumber=tbltestrecord.PatientMobileNumber";

        connection.query(sql,function(err,res) {
            if(err) throw err
            //console.log(JSON.stringify(res));
            
            JSON.stringify(res)
            var n=res.length;
            // for(i=0;i<n;i++){
            //     console.log(res[i].OrderNumber,res[i].FullName,res[i].MobileNumber,res[i].TestType,res[i].testid);
            // }
            

            response.render('all-test',{records:res});
         })

})





module.exports=router;