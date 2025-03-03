const {Server} = require('socket.io')
const io = new Server({ cors: {
    origin: "https://chat-app-zeta-pearl-83.vercel.app", // Link frontend
    methods: ["GET", "POST"]
  }

    
})

let onlineUser = []

io.on('connection',(socket)=>{
    
    socket.on('addNewUser',(userId)=>{
        !onlineUser.some((u)=>userId==u.userId) &&
        onlineUser.push({
            userId,
            socketId:socket.id
        })
        io.emit('getOnlineUser',onlineUser)
    })
    socket.on('disconnect',()=>{
        onlineUser = onlineUser.filter((onlineU)=>onlineU?.socketId != socket.id)
        io.emit('getOnlineUser',onlineUser)
    })
    socket.on('sendMessage',(message)=>{
        const user = onlineUser.find(user=>user.userId == message.recepientId)
        if(user){
            io.to(user.socketId).emit('getMessage',message)
            io.to(user.socketId).emit('getNotification',{
                isRead:false,
                senderId:message.senderId,
                currentChat:message.currentChat,
                date:new Date()
            })
        }
    })
})

io.listen(3000)