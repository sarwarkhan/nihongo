var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Counter = new Schema({
    _id: String,
    seq: Number
});

module.exports = mongoose.model('counters', Counter);
