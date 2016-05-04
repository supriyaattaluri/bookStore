var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var authordb = mongoose.model('authordb');


router.post('/create',createAuthor);
router.get('/listall',showAllAuthors);
router.get('/list/:id',showSingleAuthor);
router.delete('/delete/:id', deleteAuthor);
router.put('/edit/:id',editAuthordetails);
router.get('/listbooks/:id',showAllBooks);



function createAuthor(req, res){

   var user = new authordb(req.body);
   user.save(function(err, rec){
     if(err){
        console.log("record not inserted");
        res.statusCode = 404;
     }
     if(rec){

      res.redirect('/author/listall');
     	// console.log("author id:"+rec.id);
      //   res.json("author record created");
       }
   });
}


function showAllAuthors(req, res){
    
    /*authordb.find({}, function(err, list){
    console.log(list);
    res.json("all the records of authors in database:"+list);
    });*/

    authordb.find({}, function(err, authors){
    res.render('authorslist.html', {"auhtors" : authors});
  });
};


function showAllBooks(req,res){

authordb.findOne({_id:req.params.id}).populate('bookdb', 'bookname').exec(function(err, author){
    console.log("authorname:"+author.authorname);
    console.log("bookname:"+author.bookdb.bookname);
    res.json(author);
    });
}




function showSingleAuthor(req , res){
   authordb.findById(req.params.id, function(err, author) {
            if (err){
                res.send(err);
              }
              console.log(author.id);
            res.json(author);
            
                    });
}

function deleteAuthor(req, res){

   authordb.remove({_id:req.params.id},function(err, doc){
      if (err){
   	    console.log(err.stack);
        }
    res.json("record Deleted");
   });
		
}


function editAuthordetails(req, res){
		
		authordb.update({_id:req.params.id}, {$set:{ authorname: req.body.authorname,
        bookname: req.body.bookname,
        authorcontact: req.body.authorcontact,
        datecreated: req.body.datecreated,
        releaseversion:req.body.releaseversion}}, {w:1}, function(err, result) {
              if(err){
                console.log(err.stack);
              }
              console.log(result);
              res.json({ message: 'author details updated!' });
            });

	};

module.exports = router;