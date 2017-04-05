var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Word = new Schema({
    word_id: Number,
    english: String,
    romaji: String,
    kana: String,
    kanji: String
});

module.exports = mongoose.model('words', Word);
