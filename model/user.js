const mongoose = require('mongoose');
const joi = require('joi')

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    firstname : {
        type : String,
        required : true
    },
    lastname : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required:true
    },
    active : {
        type : Boolean,
        value : false
    }
});

const User = mongoose.model('user',userSchema,'users');

const validate = (user)=>{
    const schema = joi.object({
        name:joi.string().required(),
        email:joi.string().email().required(),
        password:joi.string().required()
    })
    return schema.validate(user);
};

module.exports= {
    User,
    validate
};