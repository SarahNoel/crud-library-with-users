process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require("mongoose");

var server = require('../app');
var expect = chai.expect;

var Book = require("../models/book");

var should = chai.should();
chai.use(chaiHttp);

describe('Compare Numbers', function() {
  it('1 should equal 1', function() {
    expect(1).to.equal(1);
  });
});

describe('Books', function() {

  Book.collection.drop();

  beforeEach(function(done){
    var testBook = new Book({
        title: "Title",
        author: "Author",
        publication: "1999",
        genre: "Genre"
    });
    testBook.save(function(err) {
      done();
    });
  });
  afterEach(function(done){
    Book.collection.drop();
    done();
  });

  it('should list ALL books on /books GET', function(done) {
    chai.request(server)
      .get('/api/v1/books')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body[0].should.have.property('_id');
        res.body[0].should.have.property('title');
        res.body[0].should.have.property('author');
        res.body[0].should.have.property('publication');
        res.body[0].should.have.property('genre');
        res.body[0].title.should.equal('Title');
        res.body[0].author.should.equal('Author');
        res.body[0].publication.should.equal('1999');
        res.body[0].genre.should.equal('Genre');
        done();
      });
  });

  it('should list a SINGLE book on /book/<id> GET', function(done) {
    var newBook = new Book({
        title: "Title",
        author: "Author",
        publication: "1999",
        genre: "Genre"
      });
      newBook.save(function(err, data) {
        chai.request(server)
          .get('/api/v1/book/'+data.id)
          .end(function(err, res){
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.have.property('_id');
            res.body.should.have.property('title');
            res.body.should.have.property('author');
            res.body.should.have.property('publication');
            res.body.should.have.property('genre');
            res.body.title.should.equal('Title');
            res.body.author.should.equal('Author');
            res.body.publication.should.equal('1999');
            res.body.genre.should.equal("Genre");
            done();
          });
      });
  });

 var newBook = new Book({
        title: "Title",
        author: "Author",
        publication: "1999",
        genre: "Genre"
      });
  it('should add a SINGLE book on /books POST', function(done) {
    chai.request(server)
      .post('/api/v1/books')
      .send({'title' : 'Title', 'author': 'Author', 'publication' : '1999', 'genre': 'Genre'})
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.have.property('title');
        res.body.should.have.property('author');
        res.body.should.have.property('publication');
        res.body.should.have.property('genre');
        res.body.title.should.equal('Title');
        res.body.author.should.equal('Author');
        res.body.publication.should.equal("1999");
        res.body.genre.should.equal("Genre");
        done();
      });
  });

  it('should update a SINGLE book on /book/<id> PUT', function(done) {
    chai.request(server)
      .get('/api/v1/books')
      .end(function(err, res){
        chai.request(server)
          .put('/api/v1/book/'+res.body[0]._id)
          .send({'title' : 'Updated Title', 'author': 'Bobby D', 'publication' : '2005', 'genre': 'fantasy'})
          .end(function(error, res){
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.have.property('title');
            res.body.should.have.property('author');
            res.body.should.have.property('publication');
            res.body.should.have.property('genre');
            res.body.title.should.equal('Updated Title');
            res.body.author.should.equal('Bobby D');
            res.body.publication.should.equal('2005');
            res.body.genre.should.equal('fantasy');
            done();
        });
      });
  });

  it('should delete a SINGLE book on /book/<id> DELETE', function(done) {
    chai.request(server)
      .get('/api/v1/books')
      .end(function(err, res){
        chai.request(server)
          .delete('/api/v1/book/'+res.body[0]._id)
          .end(function(error, response){
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.have.property('title');
            response.body.should.have.property('_id');
            response.body.title.should.equal('Title');
            done();
        });
      });
  });

});
