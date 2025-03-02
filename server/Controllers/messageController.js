const chatModel = require("../Models/chatModel")
const messageModel = require("../Models/messageRoute")


const createMessage = async (req,res)=>{
    try{
        const {text,senderId,chatId} = req.body
        const newMessage = await new messageModel({
            text,
            senderId,
            chatId
        })
        const response = await newMessage.save()
        res.status(200).json(response)
    }catch(e){
        res.status(400).json('error at create mes')
        console.log(e)
    }
   
    
}

const getMessage = async (req,res)=>{
    try{
        const {chatId} = req.query
        console.log(chatId)
        const message = await messageModel.find({
            chatId
        })
        console.log(message)
        res.status(200).json(message)
    }catch(e){
        res.status(400).json('error at get mes')
        console.log(e)
    }
}

module.exports = {getMessage,createMessage}