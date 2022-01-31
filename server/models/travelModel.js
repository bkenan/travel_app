const mongoose = require('mongoose');

// Schema
const schema = mongoose.Schema({
    name: {type: String, required:true},
    type: {type: String, required:false},
    star: {type: Number, required:false},
    basket: {type: Boolean, required:false},
    comments: {type: String, required:false},
   });

// Models
const Travel = mongoose.model('Travel', schema);

module.exports = Travel;