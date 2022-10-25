const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const http = require('http');
const ejs = require('ejs');
const mysql = require('mysql');
const connection = require('./database');
var session=require('express-session')
var flash=require('connect-flash')

 var multer = require('multer');


const app = express();
const port = process.env.PORT || 5000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// var fileUpload = require('express-fileupload')


app.set('view engine', 'ejs');

// app.use(fileUpload({ useTempFiles: true }));


//static file
app.use(express.static(path.join(__dirname, '..', 'public')));




//routes
const liveup=require('../routes/live-updates')
const indexRoutes = require('../routes/index');
const testform = require('../routes/testing-form')
const log = require('../routes/log');
const oldtest = require('../routes/old-test');
const psreport = require('../routes/test-report-search');
const success = require('../routes/success');
const admindash = require('../routes/dashboard')
const addphel = require('../routes/add-phel');
const manphel = require('../routes/manage-phel');
const alltest = require('../routes/all-test');
const bwdate = require('../routes/bw-date');
const searchreport = require('../routes/search-result')
const testdetail = require('../routes/test-details');
const editphel = require('../routes/edit-phel');
const deletephel = require('../routes/delete-phel');
const passrec = require('../routes/password-recovery')
const searchresult = require('../routes/search-result-report')
const patientreport = require('../routes/patient-report')
const patientsearchreport = require('../routes/patient-search-report');
const covidtracker = require('../routes/covid-live-tracker')
const patientrepdetail=require('../routes/patient-report-details')
const newtest=require('../routes/new-test')
const assign=require('../routes/assigned');
const samplsentlab=require('../routes/samplesent-lab-test')
const samplecoll=require('../routes/sample-collected-test');
const delivered=require('../routes/reportdelivered-test');
const ontheway=require('../routes/ontheway-samplecollection-test');
const { cookie } = require('request');


let reqPath = path.join(__dirname);



app.use(session({
    secret:'secret',
    cookie:{maxAge:60000},
    resave:false,
     sssaveUninitialized:false

}));


app.use(flash())

app.get('/', function (req, res) {

    let reqPath = path.join(__dirname, './views');
    console.log(reqPath)
    res.render('index')

})


app.listen(port, function () {
    console.log("App listening to port " + port);
    console.log(path.join(__dirname, '..', 'public '));
    connection.connect(function (err) {
        if (err) throw err;
        console.log("Database connected! ");

    })

})




app.get('/logout', function (req, res) {
    
    res.redirect('/');
});


//routes  middleware

app.use(indexRoutes);
app.use(testform);
app.use(log);
app.use(oldtest);
app.use(psreport);
app.use(success);
app.use(liveup)
app.use(admindash);
app.use(addphel);
app.use(manphel);
app.use(alltest);
app.use(bwdate);
app.use(searchreport)
app.use(testdetail);
app.use(editphel);
app.use(deletephel);
app.use(passrec);
app.use(searchresult);
app.use(patientreport)
app.use(patientsearchreport);
app.use(covidtracker);
app.use(patientrepdetail)
app.use(newtest);
app.use(assign);
app.use(ontheway);
app.use(samplecoll);
app.use(samplsentlab);
app.use(delivered);



// module.exports =fileUpload;


////////////////////////

