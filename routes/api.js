var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();
var Book = require('../models/book.js');


//get all books
router.get('/books', function(req, res, next){
  Book.find(function(err, books){
    res.json(books);
  });
});

//get one book
router.get('/book/:id', function(req, res, next){
  Book.findById(req.params.id, function(err, book){
    res.json(book);
  });
});

//post-add one book
router.post('/books', function(req, res, next) {
  new Book(req.body)
  .save(function(err, book){
    res.json(book);
  });
});

//put- update one book
router.put('/book/:id', function(req, res, next) {
  var query = {'_id':req.params.id};
  var payload = req.body;
  var options = {new:true};
  Book.findOneAndUpdate(query, payload, options, function(err, book){
    res.json(book);
  });
});

//delete one book
router.delete('/book/:id', function(req, res, next){
  var query = {'_id':req.params.id};
  Book.findOneAndRemove(query, function(err, book){
    res.json(book);
  });
});


module.exports = router;
