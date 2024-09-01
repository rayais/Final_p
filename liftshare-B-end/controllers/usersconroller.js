const userschema = require("../model/userschema")
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

exports.register=async(req,res)=>{
    const newuser=req.body
    
    try {
        const finduser=await userschema.findOne({'email':newuser.email})
        if(finduser)
            res.status(400).send({msg:"user exist"})
        else{
            const user=new userschema(newuser)
            const hpass= bcrypt.hashSync(newuser.password,10)
            user.password=hpass
            const token=jwt.sign({id:user._id},'2024')
            await user.save() 
            res.status(200).send({msg:'user add done !',user,token})
        }
    } catch (error) {
        res.status(500).send(error)
    }
}
exports.login=async(req,res)=>{
    const{email,password}=req.body
    try {
      console.log(req.body)
        const userex = await userschema.findOne({ email });
        if (userex) {
          
          if (bcrypt.compareSync(password,userex.password) ) {
            const secretkey = "2024";
            const token = jwt.sign({ id: userex._id }, secretkey);
            res.status(200).send({ msg: "login succefjdsdljf", userex,token });
          } else res.status(400).send({ msg: "wrong password", userex });
        } else {
          res.status(400).send({ msg: "email not found" });
        }
      } catch (error) {
        res.status(500).send( error);
      }
}
exports.updateuser=async(req,res)=>{
    const user=req.body
    console.log(user)
    try {
        await userschema.findByIdAndUpdate(user._id,user)

        res.status(200).send({msg:"user upadated",user})
    } catch (error) {
        res.status(500).send(error)
    }
}
exports.getUser = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header
 

  if (!token) {
    return res.status(401).send({ msg: 'No token provided' });
  }

  try {
    
    console.log("decoded :",token)
    const decoded = jwt.verify(token,'2024'); // Use the same secret key as in your token generation
    const user = await userschema.findById(decoded.id);
    if (!user) {
      return res.status(404).send({ msg: 'User not found' });
    }
    res.status(200).send(user);
  } catch (error) {
    return res.status(401).send({ msg: 'Unauthorized: Invalid token' });
  }
};