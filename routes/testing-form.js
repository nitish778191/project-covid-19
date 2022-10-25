const express = require('express');
const bodyParser = require('body-parser');
const connection = require('../server/database');
const mysql = require('mysql');
const path = require('path');
const { time } = require('console');
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

//random number function
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}



router.get('/testing-form', function (req, res) {

    res.render('testing-form');


})


router.post('/testing-form', function (req, res) {
    var name = req.body.fullname;
    var mnumber = req.body.mobilenumber;
    var dob = req.body.dob;
    var govtid = req.body.govtissuedid;
    var govtidnumber = req.body.govtidnumber;
    var address = req.body.address;
    var state = req.body.state;
    var testtype = req.body.testtype;
    var timeslot = req.body.birthdaytime;
    var orderno = getRandomInt(1000000, 9999999);
    //console.log(req.body);

    var sql = "INSERT INTO tblpatients(FullName,MobileNumber,DateofBirth,GovtIssuedId,GovtIssuedIdNo,FullAddress,State) VALUES ?"
    var flag = 0
    var values = [
        [name, mnumber, dob, govtid, govtidnumber, address, state]
    ];

    var sqll = "INSERT INTO tbltestrecord(PatientMobileNumber,Testtype,TestTimeSlot,OrderNumber) VALUES ?"

    var vall = [
        [mnumber, testtype, timeslot, orderno]
    ];

    connection.query(sql, [values], function (error, result) {
        if (error) throw error;
        res.send('Patient Registered Successfully with order number ' + orderno);

    })

    connection.query(sqll, [vall], function (error, result) {
        if (error) throw error;
        else
            flag = 1;
    })

    // if(flag){
    //     alert("Your test request submitted successfully. Order number is "+orderno);

    // }



    //console.log(connection.query("select * from tblpatients"));


    // res.redirect('/');\
    connection.query("select * from tblpatients", function (err, res) {
        if (err) throw err;
        //   console.log('the data is :\n',res);
        //    console.log(res.length);
        //console.log(data.length);
        var n = res.length;
        for (i = 0; i < n; i++) {
            //console.log(res[i].id,res[i].FullName);
        }

    })

})




module.exports = router;