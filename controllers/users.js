const express =require("express");

const router = express.Router();
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/verifytoken");
const bcrypt = require("bcrypt");



//models 
const User = require("../models/User") 






router.post("/signup", async (req,res)=>{


    try {
const user = await User.create({
username : req.body.username,
 hashedPassword: bcrypt.hashSync(
        req.body.password,
        parseInt(process.env.SALT)
      ),
 isAdmin :  req.body.isAdmin    
})

const token = jwt.sign(
      {
        username: user.username,
        _id: user._id,
      },
      process.env.JWT_SECRET
    );



res.status(201).json({token ,user})

} catch (error) {
  res.status(400).json({ error: error.message });
}

})



router.post("/signin",async (req,res)=>{
try {

  const user = await User.findOne({username : req.body.username});

  if (user && bcrypt.compareSync(req.body.password , user.hashedPassword)){
    const token = jwt.sign({
      username : user.username ,
      _id : user._id
    },process.env.JWT_SECRET)
    res.status(201).json({token});
  }else {
      res.status(401).json({ error: "Invalid username or password." });
    }


}catch(error){
res.status(400).json({error : error.message})
}

})




module.exports = router;