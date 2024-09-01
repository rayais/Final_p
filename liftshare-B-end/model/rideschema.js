const mongoose= require('mongoose')

const rideschema=new mongoose.Schema({
    driver:{
       type: String ,
       
        },
    carModel:{
       type: String 
       
        },
    phone:{
       type: Number 
       
        },
    carPictures:{
        type:Array,
        default:['https://media.istockphoto.com/id/1084688262/vector/car-icon-vector-flat-simple-cartoon-transportation-symbol-isolated-on-white-side-view.jpg?s=612x612&w=0&k=20&c=aM8iiKm2WCjsRqGYGxkQPq7vktwkfZBxoduYxvkOCXw=']
    },
    trajectory:{
        type:Array,
        required:true
    },
    Description:{
        type:String
        
    },
    days:{
        type:Array,
    },
    profPic:String,
    departureTime:String,
    returnTime:String,
    date:Date,
    isDAily:Boolean,
    cost:Number,
    places:Number,
    fblink:String,
    email:String
},
{
    timestamps:true
}
)
module.exports=mongoose.model('ride',rideschema)