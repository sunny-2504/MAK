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
mongoose.connect('mongodb+srv://admin:sunny007@cluster0.hu9tcgq.mongodb.net/?retryWrites=true&w=majority', function (err) {
    if (err) {
        console.log('Error connecting to database');
    } else {
        console.log('Connected to database');
    }
});

app.post('/upload', upload.single('csvFile'), async (req, res) => {
    const csvData = req.file.buffer.toString()
    csv()
        .fromString(csvData)
        .then((jsonObj)=>{
            const ID = jsonObj[0].ID
            const CSVdata = {}
            delete jsonObj[0].ID
            for (const key in jsonObj[0]) {
                CSVdata[key] = jsonObj[0][key]
            }
            const data = new Data({
                ID,
                CSVdata
            })
            data.save().then(
            res.json({data : CSVdata, message : 'success'}))
        })
        

    
});

app.post('/get', upload.none(), async (req, res) => {
    const ID = req.body.ID
    const data = await Data.findOne({ID})
    res.json({data : data.CSVdata, message : 'success'})
})

