//create a schema to store ID and an array of objects
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var dataSchema = new Schema({
    ID : String,
    CSVdata: Object
});
var Data = mongoose.model('Data', dataSchema);
module.exports = Data;
