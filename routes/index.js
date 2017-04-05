var express = require('express');
var router = express.Router();
var async = require('async');


var Counters = require('../models/counters');
var Words = require('../models/words');
var Sentences = require('../models/sentences');


/* GET home page. */
router.get('/', function(req, res, next) {
  var eSession = req.session;
  var latestWord = Counters.findOne({ _id: "current_id" });
  latestWord.exec(function(err, latest) {
    if(!eSession.isFromExample) {
      eSession.displayWordId = Math.floor(Math.random() * (latest.seq - 1 + 1)) + 1;
    } else {
      eSession.isFromExample = false;
    }
    async.parallel({
      word_select: function(callback) {
        var wordQuery = Words.where({ word_id: eSession.displayWordId });
        wordQuery.findOne(callback);
      },
      related_sentences: function(callback) {
        var sentenceQuery = Sentences.where({ word_id: eSession.displayWordId });
        sentenceQuery.find(callback);
      }
    }, function(err, results) {
      console.log(eSession);
      res.render('index', { title: 'Nihongo', user : req.user, error: err, data: results });
    });
  });

});

/* Get word add form */
router.get('/new-word', function(req, res, next){
  if (!req.user) {
      res.render('users/login', { error : 'You are not authorized. Please login.' });
  } else {
    res.render('new-word', { title: 'Nihongo | Add new word', user : req.user });
  }
});

/* insert word */
router.post('/new-word', function(req, res) {
  if (!req.user) {
      res.render('users/login', { error : 'You are not authorized. Please login.' });
  } else {
    var countersQuery = Counters.findOne({_id:"current_id"});
    countersQuery.exec(function(err, counter) {
      if(!err) {
        let nextSeq = counter.seq + 1;
        let newWord = new Words({
          word_id: nextSeq,
          english: req.body.english,
          romaji: req.body.romaji,
          kana: req.body.kana,
          kanji: req.body.kanji
        });
        newWord.save(function(err, results) {
          Counters.where({_id: 'current_id'}).update({ $set: {seq: nextSeq} }, function(err, counter) {
              req.session.isFromExample == true;
              res.render('new-word', { title: 'Nihongo | Add new word', user : req.user, error: 'New word successfully added.' });
          });
        });
      }
    })

  }

});

/* Get example sentence add form */
router.get('/new-example', function(req, res, next){
  if (!req.user) {
      res.render('users/login', { error : 'You are not authorized. Please login.' });
  } else {
    res.render('new-example', { title: 'Nihongo | Add new example', user : req.user });
  }
});

/* insert example */
router.post('/new-example', function(req, res) {
  if (!req.user) {
      res.render('users/login', { error : 'You are not authorized. Please login.' });
  } else {
    let wordId = req.session.displayWordId;
    let newExample = new Sentences({
      word_id: wordId,
      english: req.body.english,
      romaji: req.body.romaji,
      kanji: req.body.kanji,
      additional: req.body.additional
    });
    newExample.save(function(err, results) {
      req.session.isFromExample = true;
      res.redirect('/');
    });
  }
});


module.exports = router;
