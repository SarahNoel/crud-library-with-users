var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Book = new Schema({
    title: String,
    author: String,
    publication: String,
    genre: String

});


module.exports = mongoose.model('books', Book);
