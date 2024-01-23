const {User} = require('../model/user');

const activateRouter = async(req,res)=>{
    // res.json(message = "Your account activated successfully")
    const {id} = req.query;
    await User.findByIdAndUpdate(id,{active:true})    
     res.json(message = "Your account activated successfully")

};

module.exports = activateRouter;