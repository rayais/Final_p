const rideschema = require("../model/rideschema")


exports.addride=async (req,res)=>{
    const ride = req.body
    
    try {
        
            const newride =new rideschema(ride)
                await newride.save()
        res.status(200).send({msg:"addING RIDE done!"})
    } catch (error) {
        res.status(500).send(error)
    }
}
exports.updateride=async (req,res)=>{
    const ride=req.body
    const {id}=req.params
    try {
        await rideschema.findByIdAndUpdate({id:id},ride)
        res.status(200).send({msg:'update RIDE done!',ride})
    } catch (error) {
        res.status(500).send(error)
    }
}
exports.deleteride=async(req,res)=>{
    const {id}= req.params
    console.log(id)
    try {
        await rideschema.findByIdAndDelete({_id:id})
        res.status(200).send({msg:"delete done !"})
    } catch (error) {
        res.status(500).send(error)
    }
}
exports.getallrides=async(req,res)=>{
    try {
        const rides=await rideschema.find().sort({ createdAt: -1 })
        
        res.status(200).send(rides)
    } catch (error) {
        res.status(500).send({error:error})
        
    }
}
exports.getridebymail=async (req,res) => {
    const email = req.headers.authorization?.split(' ')[1];
    try {
        console.log(req.body)
        const rides=await rideschema.find({email}).sort({createdAt:-1})
        console.log(rides)
        res.status(200).send(rides)
    } catch (error) {
        res.status(500).send(error)
    }
}