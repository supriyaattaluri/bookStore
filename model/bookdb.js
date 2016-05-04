
module.exports = function(mongoose) {
    "use strict";
    //console.log(mongoose);
 
    var mongoose = require('mongoose');

  
    var Schema = mongoose.Schema;
    //var relationship = require("mongoose-relationship");

    var bookSchema = new Schema({
         bookname: String,
        title: String,
        isbnnumber: Number,
        author: String,
        publisher:String,
        number_of_pages:Number,
        authorid:{ type:Schema.ObjectId, ref:"authordb"}
        //authorid : [String]
        //authorid:[{ type:Schema.ObjectId, ref:"authordb" }]
    });

    var bookdb = mongoose.model('bookdb', bookSchema);
    return bookdb;
};