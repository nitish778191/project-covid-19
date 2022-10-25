const express=require('express');
const path = require('path');
const connection = require('../server/database');
const router=express.Router();








router.get('/reportdelivered-test',function(req,result){
   
    let reqPath = path.join(__dirname, '../');
    

    var sql="select tbltestrecord.OrderNumber,tblpatients.FullName,tblpatients.MobileNumber,tbltestrecord.TestType,tbltestrecord.TestTimeSlot,tbltestrecord.RegistrationDate,tbltestrecord.id as testid from tbltestrecord join tblpatients on tblpatients.MobileNumber=tbltestrecord.PatientMobileNumber where ReportStatus='Delivered'"
       
    connection.query(sql,function(err,res){
        if(err) throw err
        //console.log("heelllooo\n",res);
        result.render('reportdelivered-test',{records:res})
        })
})





module.exports=router;