const express=require('express')
const fs=require('fs')
const { register, login, updateuser, getUser } = require('../controllers/usersconroller')
const { getallrides, deleteride, updateride, addride, getridebymail } = require('../controllers/ridescontroller')
const { verifyToken } = require('../middelware/middel')
const path = require('path')

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
mainrouter.post('/savemessage', (req, res) => {
    const { message } = req.body;
  
    try {
      // Get the current date and time
      const currentDate = new Date();
      const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
      const formattedTime = `${currentDate.getHours()}-${currentDate.getMinutes()}`;
      const filename = `${formattedDate}_${formattedTime}.txt`;
  
      // Set the directory where you want to save the messages
      console.log(__dirname)
      const messagesDir = path.join(__dirname, '../messages');
      // Ensure the directory exists
      if (!fs.existsSync(messagesDir)) {
        fs.mkdirSync(messagesDir);
      }
  
      // Define the file path
      const filePath = path.join(messagesDir, filename);
  
      // Write the message to the file
      fs.writeFileSync(filePath, message);
  
      res.status(200).send({ msg: 'Message saved successfully!' });
    } catch (error) {
      console.error('Error saving message:', error);
      res.status(500).send({ msg: 'Failed to save message' });
    }
  });

module.exports=mainrouter