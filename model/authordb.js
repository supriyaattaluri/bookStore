
module.exports = function(mongoose) {
    "use strict";
  
    var mongoose = require('mongoose');

   
    var Schema = mongoose.Schema;
    //var relationship = require("mongoose-relationship");

    var authorSchema = new Schema({
        authorname: String,
        bookname: String,
        authorcontact: String,
        datecreated: String,
        releaseversion: Number,
    books: [{ type:Schema.ObjectId, ref:"bookdb" }]

        
    });

    //authorSchema.plugin(relationship, { relationshipPathName:'bookdb' });

    var authordb = mongoose.model('authordb', authorSchema);
    return authordb;
};