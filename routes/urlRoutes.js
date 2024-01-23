const urlController = require('../contoller/urlController');
const express = require('express');
const url = require('../model/urlModel'); 
const { config } = require('dotenv');

const urlRouter = express.Router();
 urlRouter.post('/getshorturl',urlController);

 urlRouter.get('/shorturl/:id', async(req,res)=>{
const id = req.url

const getlongUrl =await url.findOne({shortUrl :`${process.env.BASE_URL}${id}`}, {_id: 0, longUrl:1})
 
res.redirect(getlongUrl.longUrl)
 });


module.exports=urlRouter;