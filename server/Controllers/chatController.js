const mongoose = require('mongoose')
const chatModel = require('../Models/chatModel')
const userModel = require('../Models/userModel')

const createChat = async (req,res)=>{
    try{
        const {firstId,secondId} = req.body
        console.log('testing:',firstId,secondId)
        
        const existUser1 = await userModel.findOne({
            _id:firstId
        })
        // console.log(existUser1[0])
        const existUser2 = await userModel.findOne({
            _id:secondId
        })



        if(!existUser1 || !existUser2){
            return res.status(404).json('user not found')
        }
        const newChat = new chatModel({
            members:[firstId,secondId]
        })
        console.log('newChat:',newChat)

        const response = await newChat.save()
        res.status(200).json(response)
    }catch(e){
        res.status(404).json('error at chat')
        console.log(e)
    }
}

const getChat = async(req,res)=>{
    try{
        const {userId} = req.query
       
        const chats = await chatModel.find({
            members:{$in:[userId]}
        })
        
        
        res.status(200).json(chats)
        return chats
    }catch(e){
        res.status(400).json('error at get chat')
    }
}

module.exports = {getChat,createChat}