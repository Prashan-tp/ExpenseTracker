const express = require('express');
const cors = require('cors');
const bodyParser =require('body-parser');
const path = require('path');

const port = 7000 ; 
const passport = require ('passport');
const passport_Jwt = require('./config/passportjwt');
const app = express();
const db = require('./config/mongoose');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
 
app.use('/',require('./router'));

app.listen(port,function(err){
    if(err){
        console.log(err) ;

    }
    console.log(`Server is running on ${port}`);
})