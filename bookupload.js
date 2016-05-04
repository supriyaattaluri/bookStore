var express=require('express');
var router = express.Router();


var multer=require('multer');
router.use(multer({dest:__dirname+'/public/'}).any());

router.post('/uploadbook',uploadBook);

function uploadBook(req,res)
{
	console.log(req.body);
    console.log(req.files);// for all inserted files information on console.

    res.send('book uploaded sucessfully');
}

module.exports = router;
