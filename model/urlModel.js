const { default: mongoose } = require("mongoose");


const urlSchema = new mongoose.Schema({
    longUrl :  String,   
    shortUrl :  String,
      
})

const urlModel = mongoose.model('url',urlSchema);

module.exports = urlModel;