const express=require('express');
const bodyParser=require('body-parser');
const connection = require('../server/database');
const mysql=require('mysql');
//var connection = mysql.createConnection({multipleStatements: true});


const path = require('path');
const { time, table } = require('console');

const router=express.Router();



router.use(bodyParser.json())

router.use(bodyParser.urlencoded({extended: true}))








router.get('/dashboard',function(req,res){
   
    let reqPath = path.join(__dirname, '../');
    var totalp,totalph,totalass,totald,totalow,totalsc,totalsl,total,totaltest,records,newc;
    const sql="select count(*) from tbltestrecord";
    const sqll="select count(*) from tblpatients"
    const sqlll="select count(*) from tblphlebotomist";
    const sqllll="select count(*) from tbltestrecord  where ReportStatus='Assigned'";
    const sqlllll="select count(*) from tbltestrecord  where ReportStatus='Sent to Lab'"
    const sqllllll="select count(*) from tbltestrecord  where ReportStatus='Sample Collected'"
    const sqlllllll="select count(*) from tbltestrecord  where ReportStatus='Delivered'"
    const sqllllllll="select count(*) from tbltestrecord  where ReportStatus='On the Way for Collection'"

    connection.query(sqll,function(err,res){
        if(err) throw err
        JSON.parse(JSON.stringify(res))
        totalp=res[0];

    })
    connection.query(sqlllll,function(err,res){
        if(err) throw err
        JSON.parse(JSON.stringify(res))
        totalsl=Object.values(res[0]);

    })
    connection.query(sqllllll,function(err,res){
        if(err) throw err
        JSON.parse(JSON.stringify(res))
        totalsc=Object.values(res[0]);

    })
    connection.query(sqlllllll,function(err,res){
        if(err) throw err
        JSON.parse(JSON.stringify(res))
        totald=Object.values(res[0]);

    })
    connection.query(sqllllll,function(err,res){
        if(err) throw err
        JSON.parse(JSON.stringify(res))
        totalsc=Object.values(res[0]);

    })

    connection.query(sqllllllll,function(err,res){
        if(err) throw err
        JSON.parse(JSON.stringify(res))
        totalow=Object.values(res[0]);

    })
    connection.query(sqllll,function(err,res){
        if(err) throw err
        JSON.parse(JSON.stringify(res))
        totalass=Object.values(res[0]);

    })
    connection.query(sqlll,function(err,res){
        if(err) throw err
        JSON.parse(JSON.stringify(res))
        totalph=Object.values(res[0]);

    })
    connection.query(sqll,function(err,res){
        if(err) throw err
        JSON.parse(JSON.stringify(res))
        totalp=Object.values(res[0]);

    })
    var rec="select tbltestrecord.OrderNumber,tblpatients.FullName,tblpatients.MobileNumber,tbltestrecord.TestType,tbltestrecord.TestTimeSlot,tbltestrecord.RegistrationDate,tbltestrecord.id as testid from tbltestrecord join tblpatients on tblpatients.MobileNumber=tbltestrecord.PatientMobileNumber where ReportStatus is null";
    var newcount="select  count(* ) from tbltestrecord where ReportStatus is null";
    connection.query(newcount,function(err,res){
        if(err) throw err
        newc=Object.values(res[0])
    })
    connection.query(rec,function(err,res){
        if(err) throw err
        records=res
    })


    connection.query(sql,function(error,result){
        if(error) throw error;
        JSON.parse(JSON.stringify(result))

        var k=Object.values(result[0]);
        // var r=Object.values(result[1]);
        // console.log(r);
        res.render('dashboard',{records:records,totaltest:k,totalph:totalph,totalp:totalp,totalass:totalass,totald:totald,totalow:totalow,totalsc:totalsc,totalsl:totalsl,newc:newc[0]});
        
    })
  
})





module.exports=router;