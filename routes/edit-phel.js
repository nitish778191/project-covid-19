const express = require('express');
const bodyParser = require('body-parser');
const connection = require('../server/database');
const mysql = require('mysql');
// const moment = require("moment");
// import * as moment from 'moment'

const path = require('path');
const { time, table } = require('console');

const router = express.Router();



router.use(bodyParser.json())

router.use(bodyParser.urlencoded({ extended: true }))

let empid;

router.get('/edit-phlebotomist', function (req, response) {

    empid = req.query.pid;
    JSON.stringify(empid);
    var sql = "select * from tblphlebotomist where id=?";

    connection.query(sql, [empid], function (err, res) {
        if (err) throw err

        JSON.parse(JSON.stringify(res))

        var n = res.length;
        console.log("empid= ", empid);
        // console.log("hello\n\n")
        // //console.log(res);
        // console.log("hello\n\n")
        //console.log(res[0].FullName,res[0].MobileNumber);
        response.render('edit-phlebotomist', { records: res[0] });



    })
    // res.render('edit-phlebotomist')
})




router.post('/edit-phlebotomist', function (req, res) {
    var fname = JSON.stringify(req.body.fullname);
    var mnumber = req.body.mobilenumber;
    var value = [
        [fname, mnumber, empid]
    ];

    // console.log("empid= ", empid);
    // console.log("mnumber= ", mnumber);
    // console.log("FullName= ", fname);

    var sql = "update tblphlebotomist set FullName=?,MobileNumber=? where id=? "
    
    connection.query(sql, [fname, mnumber, empid], function (err, result) {
        if (err) throw err
        res.send('Employee Updated Successfully with Empid ' + empid);

    })
})




module.exports = router;