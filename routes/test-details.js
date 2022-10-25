const express = require('express');
const bodyParser = require('body-parser');
const connection = require('../server/database');
const mysql = require('mysql');
const app=express();
var fs = require('fs');
var busboy = require('connect-busboy');

const path = require('path');
const { time, table } = require('console');
const { json } = require('express/lib/response');

const router = express.Router();
router.use(busboy()); 


const fileUpload = require('express-fileupload');
const { NULL } = require('mysql/lib/protocol/constants/types');
router.use(bodyParser.json())

router.use(bodyParser.urlencoded({ extended: true }))
router.use(fileUpload({ useTempFiles: true }));





function timenow() {
    let date_ob = new Date();

    
    let date = ("0" + date_ob.getDate()).slice(-2);

  
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    
    let year = date_ob.getFullYear();

   
    let hours = date_ob.getHours();


    let minutes = date_ob.getMinutes();

    let seconds = date_ob.getSeconds();

    

    var p;

    p = (year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);
    return p;
}








function splitStr(str) {
    var string = str.split("-");
    return string;
}



var testid;
var querya;
var queryb;
var queryc;
var queryd; 



router.get('/test-details', function (req, response) {

    let reqPath = path.join(__dirname, '../');

    testid = req.query.oid;
    // console.log(req.query);
    // console.log(testid);

    

    const sql = "select * from tbltestrecord join tblpatients on tblpatients.MobileNumber=tbltestrecord.PatientMobileNumber where  tbltestrecord.OrderNumber=?"
    const sqll ="select * from tblreporttracking join tbladmin on tbladmin.ID=tblreporttracking.RemarkBy where tblreporttracking.OrderNumber=?";
    var sqlll = "select FullName,EmpID from tblphlebotomist";
    var sqllll = "select ReportStatus from tbltestrecord where OrderNumber=?";



    connection.query(sqllll, [testid], function (err, res) {
        if (err) throw err
        queryd = res;
        
    })
    


    connection.query(sqll, [testid], function (err, res) {
        if (err) throw err
        queryb = res;
        JSON.stringify(queryb)
        //console.log(queryb);
       
    })







    connection.query(sqlll, function (err, res) {
        if (err) throw err
        queryc = res;

    })
//console.log(queryc);

    connection.query(sql, [testid], function (err, res) {
        if (err) throw err

        JSON.parse(JSON.stringify(res))

        querya = res;

        // console.log("hello\n\n")
        // //console.log(res);
        // console.log("hello\n\n")
        // console.log(res[0].MobileNumber,res[0].DateOfBirth.toDateString());
        console.log(queryb);
        response.render('test-details', { records: querya[0], testtracking: queryb, phlerecord: queryc, reportstatus: queryd[0] });


    })




})







router.post('/test-details', function (req, result) {

    //console.log(req.body);
    var k = req.body.assignto;

    var rstatus = req.body.status;
    //console.log(rstatus);
    var rremark = req.body.remark;
    //console.log(rremark);

    //var flag=0;

    JSON.stringify(rstatus);

    JSON.stringify(rremark);
    JSON.stringify(k);

    //console.log(k);

    if (k != undefined) {
        var p = k.split("-");
        //flag=1;
        var name = p[0];
       // console.log(name);
        var id = p[1];
        //console.log(id, name);
        var ti = timenow();
        //console("hello");
       //console.log(ti,testid);
        // var j='Assigned';
       var sql = "update tbltestrecord set ReportStatus='Assigned',AssigntoName=?,AssignedtoEmpId=?,AssignedTime=? where OrderNumber=?"

           
        
        connection.query(sql, [name, id, ti, testid], function (err, res) {
            if (err) throw err
            result.redirect('dashboard');

        })


    }

   
   
   //console.log(rstatus);
    if(rstatus === 'Sample Collected'  ||  rstatus=='On the Way for Collection' || rstatus=='Sent to Lab')
    {



    var sql = "update tbltestrecord set ReportStatus= ? where OrderNumber =?"

    
    
    connection.query(sql, [rstatus, testid], function (err, res) {
        if (err) throw err

    })





    var sqll = 'insert into tblreporttracking(OrderNumber,Status,Remark,RemarkBy) values ?';
     
    
    
    var values=[
         [testid, rstatus, rremark, 2]
     ];
    
    
     connection.query(sqll, [values], function (err, res) {
        if (err) throw err
        result.redirect('dashboard');


    })



    }






    if(rstatus == 'Delivered')
    {
        
        console.log("Inside deliver!")
        //console.log(req.files);
        if(req.files)
        console.log("hello")
        var file=   req.files.report;
        var file_name=file.name;
        JSON.stringify(file);
        
        var k=req.body.remark;
        JSON.stringify(k);

        var kp=path.join(__dirname, '..', 'public','reportfiles','/');
        
        const extension=path.extname(file_name);
        const allowedExtension= /pdf|docs/;

        if(allowedExtension.test(extension)){
            file.mv(kp+file_name,function(err){
                if(!err)
                 console.log("file_moved")
             })
     
     
             var sqll = 'insert into tblreporttracking(OrderNumber,Status,Remark,RemarkBy) values ?';
             var values=[
                 [testid, rstatus, k, 2]
             ];
            
            
            
             connection.query(sqll, [values], function (err, res) {
                if (err) throw err
                
        
        
            })
     
          
            var sql= 'update tbltestrecord set ReportStatus=?,FinalReport=?,ReportUploadTime=? where OrderNumber=?'
     
           connection.query(sql,[rstatus,file_name,ti,testid],function(err,res){
               if(err) throw  err
               result.redirect('dashboard');
           })
     

        }

        else{
            result.send("wrong extension");
        }
        


    }
    




})









module.exports = router;