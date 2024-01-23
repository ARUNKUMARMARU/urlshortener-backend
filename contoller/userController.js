const {User} = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../utils/config')
const nodemailer = require('nodemailer');
const Token = require('../model/token');
require('dotenv').config();


const userController = {
    signup : async(req,res,next)=>{
       try{
            let{username,firstname,lastname,password} = req.body;

        let user = await User.findOne({username}); 
             
        if(user){
           return res.status(400).json({error:"This mailid was already exist"});
            }
            
             const passwordHash = await bcrypt.hash(password, 10);
        
            const newUser = new User({
                username,
                firstname,
                lastname,
                password : passwordHash,
                active : false
             });
             user = await newUser.save();

           
          const sendEmail = async () => {             
                   const transporter = nodemailer.createTransport({                    
                       service: process.env.SERVICE,                      
                       auth: {
                           user: process.env.USER,
                           pass: process.env.PASS,
                       },
                   });          
                             

               let token = Token.findOne({ userId: user._id });
               if (!token) {
                   token = await new Token({
                       userId: user._id,
                       token: crypto.randomBytes(32).toString("hex"),
                   }).save();
               }
                     
               const link = `${process.env.BASE_URL}/activate?id=${user._id}`;
               transporter.sendMail({
                from: process.env.USER,
                to: username,
                subject: "id-activation",
                text: link,
            }); 
         
            //    sendEmail(user.email, "Id activation", link);
       
               res.send("Id activation link sent to your email account");  
        
            // res.json({message : "User created",user : savedUser});

       }
       sendEmail(), next()
    }

       catch(error){
         res.status(500).json({error:error.message})
        };
    },


    signin: async(req,res)=>{
      try{
         const {username,password} = req.body;

         const user = await User.findOne({username});
         if(!user){
            return res.status(400).json({message:"This username doesn't exists"});
         };
         if(!user.active){
            return res.status(400).json({message:"Kindly activate your account"});
         };

         const passwordMatch = await bcrypt.compare(password, user.password);
         if(!passwordMatch){
            return res.status(400).json({message:"Invalid password"});
         }
         
         const token = jwt.sign({
            id : user._id,
            username : user.username,
            firstname : user.firstname,
            lastname : user.lastname
         },config.JWT_SECRET);

         res.status(200).json({message : "user successfully signedin", token, username:user.username,firstname:user.firstname,lastname:user.lastname});

      }catch(error){
         res.status(500).json({error:error.message});
      };
    }
}

module.exports=userController;