const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    text:String,
    senderId:String,
    chatId:String
},{
    timestamps:true
})

const messageModel = mongoose.model("Message",messageSchema)

module.exports = messageModel