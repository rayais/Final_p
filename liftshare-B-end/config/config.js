const mongoose=require('mongoose')

const config=async()=>{
    try {
        await mongoose.connect('mongodb://localhost:27017/liftdb')
        console.log("database connected")
    } catch (error) {
        console.log(error)
    }
}
module.exports=config