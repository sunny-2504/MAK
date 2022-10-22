var express = require('express');
var app = express();
var mongoose = require('mongoose');
var multer = require('multer');
const upload = multer();
var Data = require('./data.js');
const csv=require('csvtojson')
const fs= require('fs');
var cors = require('cors')
app.use(cors())
// run on port 4000
var port = 4000;
app.listen(port, function () {
    console.log('Server running on port ' + port);
});

// connect to database
mongoose.connect('mongodb+srv://admin:sunny007@cluster0.hu9tcgq.mongodb.net/?retryWrites=true&w=majority/MAK', function (err) {
    if (err) {
        console.log('Error connecting to database');
    } else {
        console.log('Connected to database');
    }
});

app.post('/upload', upload.single('csvFile'), async (req, res) => {
    const csvData = req.file.buffer.toString()
    console.log(csvData)
    csv()
        .fromString(csvData)
        .then((jsonObj)=>{
            const ID = jsonObj[0].ID
            const CSVdata = []
            
            res.json({data : jsonObj, message : 'success'});
        })
        

    
});

