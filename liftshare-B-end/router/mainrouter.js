const express=require('express')
const { register, login, updateuser, getUser } = require('../controllers/usersconroller')
const { getallrides, deleteride, updateride, addride, getridebymail } = require('../controllers/ridescontroller')
const { verifyToken } = require('../middelware/middel')

const mainrouter=express.Router()
//users routers
mainrouter.post('/user',register)
mainrouter.post('/login',login)
mainrouter.put('/user',updateuser)
mainrouter.get('/getuser', getUser)

//rides routers
mainrouter.get('/ride',getallrides)
mainrouter.get('/mailride',getridebymail)
mainrouter.delete('/ride/:id',deleteride)
mainrouter.put('/ride',updateride)
mainrouter.post('/ride',addride)


module.exports=mainrouter