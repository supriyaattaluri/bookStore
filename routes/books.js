var express=require('express');
var router = express.Router();

var mongoose = require('mongoose');
var bookdb = mongoose.model('bookdb');
var book_author = mongoose.model('book_author');


//router.get('/',loadbook);
router.post('/create',createBook);
router.get('/listall',showAllBooks);
router.get('/list/:id',showSingleBook);
router.delete('/delete/:id', deleteBook);
router.put('/edit/:id',editBook);

/*function loadbook(req, res){
 res.render("createBook.html" );
}*/

function createBook(req, res)
{
   
var book = new bookdb(req.body);
   book.save(function(err, bookcreated){
     if(err){
        console.log("book not inserted");
        res.statusCode = 404;
     }
     if(bookcreated){ 
     res.redirect('/books/listall');
   /*var ab = new book_author({book_id:bookcreated.id,author_id:bookcreated.authorid});
   ab.save(function(err, book){
      if(err){
        console.log("book author not inserted");
        res.statusCode = 404;
      }
       console.log("books authors Added");
       res.json({"msg" : "Book and its reference created"});
    });*/
    }

 });
}

function showAllBooks(req,res){
  bookdb.find({}, function(err, books){
    res.render('showbooks.html', {"books" : books});
  });
  /*bookdb.find({}).populate("authors").exec(function(err, list){
    console.log(list);
    res.json(list);
  });*/

  /*bookdb.find({}, function(err, list){
    console.log(list);
    res.json("all the books in database:"+list);
    });*/
  }


function showSingleBook(req , res){
   bookdb.findById(req.params.id, function(err, book) {
            if (err){
                res.send(err.stack);
              }
            res.json(book);
            console.log(book.id);
                    });
}


function deleteBook(req, res){
  
  bookdb.remove({_id:req.params.id},function(err, doc){
   
  res.json("record Deleted");

  });
}

function editBook(req,res){

     bookdb.update({_id:req.params.id}, {$set:{bookname:req.body.bookname,
     	    bookauthor :req.body.bookauthor,
            isbnnumber :req.body.isbnnumber,
            title :req.body.title
           }}, {w:1}, function(err, result) {
              if(err){
                console.log(err.stack);
              }
              res.json({ message: 'student updated!' });
            });
}


module.exports = router;


