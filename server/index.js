require('dotenv').config({ path: '../server/.env' });
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const userRoute = require('./Routes/userRoute')
const chatRoute = require('./Routes/chatRoute');
const messageRoute = require('./Routes/messageRoute');

app.use(express.json())
app.use(cors())
app.use("/api/users",userRoute)
app.use("/api/chat",chatRoute)
app.use("/api/message",messageRoute)

const atlasUri = process.env.ATLAS_URI
const port = process.env.PORT || 5000
console.log(atlasUri)

mongoose.connect(atlasUri).then(()=>{
    console.log('successfully mongoose')
})
.catch((e)=>{
    console.log('failed mongoose:',e.message)
})
app.listen(port,(req,res)=>{
   
    console.log('open at ',port)
})



