var express=require('express');
var bodyparser=require('body-parser');

var path =  require("path");

var cons = require('consolidate');

var app=express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

var mongoose = require('mongoose');
require('./model/bookdb')(mongoose);
require('./model/authordb')(mongoose);
require('./model/book_author')(mongoose);
mongoose.connect('mongodb://localhost:27017/bookstoredb');





// view engine setup
app.engine('html', cons.swig)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
  app.use(express.static(__dirname + '/public'));

app.get('/', function(req,res){
        res.render("index.html");
});
app.get('/createBook', function(req,res){
        res.render("createBook.html" );
});
app.get('/authorsinfo', function(req,res)
{
	res.render("createauthor.html");
})
/*app.post('/createBook', function(req,res){
       console.log(req.body);
       res.render("createBook.html" );
});*/

var books= require('./routes/books');
app.use('/books' , books);

var bookupload=require('./bookupload');
app.use('/bookupload',bookupload);

var author= require('./routes/author');
app.use('/author',author);


app.listen(2016);
console.log("running at 2016");		