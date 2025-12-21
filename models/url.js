const mongoose = require('mongoose');

const urlScehma= new mongoose.Schema({
  shortId:{
    type:String,
    required:true,
    unique:true
  },
  redirectUrl:{
    type:String,
    required:true
  },
  visitHistory:[{timestamp:{type:Number}}]
},{timestamps:true});
const URL= mongoose.model('Url', urlScehma);
module.exports= URL;
  
