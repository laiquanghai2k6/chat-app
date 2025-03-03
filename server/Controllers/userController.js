const userModel = require('../Models/userModel')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const createToken = (_id)=>{
    const jwtKeys = process.env.JWT_SECRET
    return jwt.sign({_id},jwtKeys,{expiresIn:'3d'})
}

const registerUser = async (req,res)=>{
    try{

        const {email,name,password} = req.body
        let user = await userModel.findOne({email})
        if(user) return res.status(400).json({error:'email existed'})
        if(!name || !email || !password) return res.status(400).json({error:'fill full'})
        if(!validator.isEmail(email)) return res.status(400).json({error:"invalid email"})
        user = new userModel({email,name,password})
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password,salt)
        await user.save()
        const token = createToken(user._id)
        res.status(200).json({_id:user._id,name,email,token})
    }catch(e){
        console.log(e.message)
        res.status(400).json({error:e.message})
    }

}   
const loginUser = async (req,res)=>{
    try{
        const {email,password} = req.body
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(400).json('user not exist')
        }
        // console.log(user)
        const isCorrectPassword = await bcrypt.compare(password,user.password)
        if(isCorrectPassword){
            const token = createToken(user._id)
            return res.status(200).json({_id:user._id,name:user.name,email,token})
        }
        return res.status(401).json('login fail')

    }catch(e){
        res.status(400).json({error:e.message})
    }
}
const findUser = async (req,res)=>{
    try{
        const {id} = req.params
        const user = await userModel.findOne({_id:id})
      
        if(!user){
            return res.status(400).json('user not exist at find')
        }
        return res.status(200).json(user)

    }catch(e){
        res.status(400).json('error at find user')
        console.log(e)
    }
}
const findAllUser = async (req,res)=>{
    try{
        const allUser = await userModel.find({})
        return res.status(200).json(allUser)
    }catch(e){
        res.status(400).json('error at find all user')
        console.log(e)
    }
}

module.exports = {registerUser,loginUser,findUser,findAllUser}