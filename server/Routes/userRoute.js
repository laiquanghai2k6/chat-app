const express  = require('express')
const route = express.Router()
const {registerUser,loginUser,findUser, findAllUser} = require('../Controllers/userController')
route.post('/register',registerUser)
route.post('/login',loginUser)
route.get('/find/:id',findUser)
route.get('/findAll',findAllUser)
module.exports = route