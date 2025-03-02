const express = require('express')
const { createChat, getChat } = require('../Controllers/chatController')
const route = express.Router()

route.post('/createChat',createChat)
route.get('/getChat',getChat)


module.exports = route