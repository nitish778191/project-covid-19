// var assert = require('assert');
// var jsdom = require('mocha-jsdom');

// global.document = jsdom();
const express = require('express');
const bodyParser = require('body-parser');
const connection = require('../server/database');
const mysql = require('mysql');
//const moment = require("moment");
// const flash = require('express-flash');
const http = require('http');
//import fetch from 'node-fetch';

//const fetch=require('node-fetch');
// const request = require("request");
//const axios = require("axios");

const path = require('path');
const { time, table } = require('console');
//const db=require('../sever/database');
//const connection = require('./database');

const router = express.Router();
router.use(bodyParser.json())

router.use(bodyParser.urlencoded({ extended: true }))

// var jsdom = require("jsdom");
// var JSDOM = jsdom.JSDOM;


// app.use((req, res, next)=>{
//     res.locals.moment = moment;
//     next();
//   });
const url = "https://api.covid19india.org/data.json";





let reqPath = path.join(__dirname, '../');
console.log(reqPath)



router.get('/covid-live-tracker.html', function (req, res) {
    var reqPath = path.join(__dirname, '../', 'public');
    res.sendFile(reqPath + '/covid-live-tracker.html')
})





module.exports = router;