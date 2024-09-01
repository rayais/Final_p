const mongoose= require('mongoose')

const userschema=new mongoose.Schema({
    email:{
       type: String ,
       required:true
        },
    name:{
       type: String ,
       required:true
        },
    phone:{
       type: Number 
        },
    picture:{
        type:String,
        default:'https://icons.veryicon.com/png/o/miscellaneous/template-1/profile-19.png'
    },
    password:{
        type:String,
        required:true
    },
    fblink:String
    
},
{
    timestamps:true
}
)
module.exports=mongoose.model('user',userschema)