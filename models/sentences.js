var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Sentence = new Schema({
  word_id: Number,
  english: String,
  romaji: String,
  kanji: String,
  additional: String
});

module.exports = mongoose.model('sentences', Sentence);
