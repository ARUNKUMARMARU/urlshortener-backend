const urlModel = require('../model/urlModel');
const crypto = require('crypto');

const urlController = async(req,res)=>{
let longUrl = req.body.geturl;
console.log(longUrl);
const randonString = crypto.randomBytes(3).toString('hex');
const shortUrl = `${process.env.BASE_URL}/shorturl/${randonString}`;

const newUrl = new urlModel({
    longUrl,
    shortUrl
});
url = await newUrl.save();
return res.status(200).json(url.shortUrl);

}

module.exports = urlController;