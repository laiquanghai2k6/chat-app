const express = require('express')
const { createMessage ,getMessage} = require('../Controllers/messageController')
const route = express.Router()

route.post('/createMessage',createMessage)
route.get('/getMessage',getMessage)


module.exports = route