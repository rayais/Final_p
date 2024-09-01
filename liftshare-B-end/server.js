const express= require('express')
const config = require('./config/config')
const mainrouter = require('./router/mainrouter')
const cors=require('cors')

const port =5410
const app=express()
app.listen(port,()=>{
    console.log("server On")
})
const corsOptions = {
    origin: 'http://localhost:5173', // Replace with your frontend's origin
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization', // Include Authorization in allowed headers
};

app.use(express.json())
config()
app.use(cors(corsOptions));
app.use('/',mainrouter)