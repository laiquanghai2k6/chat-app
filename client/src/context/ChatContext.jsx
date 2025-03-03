import { createContext, useContext,useState, useEffect, useCallback } from "react";
import { baseUrl, chatUrl, getRequest, messageUrl, postRequest } from "../service/service";
import { AuthContext } from "./AuthContext";
import {io} from 'socket.io-client'
export const ChatContext= createContext()

const ChatContextProvider = ({children,user}) => {
    const [userChats,setUserChats] = useState(null)
    const [isSelectChat,setIsSelectChat] = useState(0)
    const [pChat,setPChat] = useState(null)
    const [currentChat,setCurrentChat] = useState(null)
    const [message,setMessage] = useState([])
    const [newMessage,setNewMessage] = useState(null)
    const [socket,setSocket] = useState(null)
    const [onlineUser,setOnlineUser] = useState(null)
    const [notification,setNotification] = useState([])
    useEffect(()=>{
    
        const newSocket = io('http://localhost:3000')
        setSocket(newSocket)
        return ()=>{
            newSocket.disconnect()
        }
    },[user])
    useEffect(()=>{
        
        if(socket == null || !user) return;
        socket?.emit('addNewUser',user?._id)
        socket?.on("getOnlineUser",(res)=>{
            setOnlineUser(res)
            
        })
        return()=>{
            socket.off('getOnlineUser')
        }
    },[socket])
    useEffect(()=>{
        if(socket == null || !user) return;
         const recepientId = currentChat?.members?.find((id)=>id !== user?._id)

        socket.emit('sendMessage',{newMessage,recepientId,senderId:user?._id,currentChat:currentChat?._id})
    },[newMessage])
    const updateCurrentChat = useCallback((chat)=>{
        setCurrentChat(chat)
        
    },[])
    useEffect(()=>{
        if(socket == null || !user) return;

        socket.on('getMessage',(res)=>{
            if(currentChat?._id != res.chatId) return
            
            setMessage(prev=>{
                return [...prev,res.newMessage]
            })
        })
        socket.on('getNotification',(res)=>{
            if(currentChat?._id == res.currentChat){
                setNotification((prev)=>
                    {
                        console.log('notifi:',[{...res,isRead:true},...prev])
                        return [{...res,isRead:true},...prev]})
                
            }else {
                
                setNotification((prev)=>{
                    console.log('notifi:',[res,...prev])
                    return [res,...prev]
                })
                
            }
            
        })
    },[socket,currentChat])

    useEffect(()=>{
        const getUser = async ()=>{
            const getAllUser = await getRequest(baseUrl+'/findAll')
            
            const potentialChat = getAllUser?.filter((u)=>{
                
                if(user?._id == u?._id) return false
                
                const isChatCreated = userChats?.some((chats)=>{
                    return chats?.members[0] == u?._id || chats?.members[1] == u?._id
                })
                return !isChatCreated
            })
            
            setPChat(potentialChat)
        }
        if(user){

            getUser()
        }
    },[userChats])

    useEffect(()=>{
        const fetchData = async ()=>{
            if(user?._id){
                const response = await getRequest(chatUrl+"/getChat?userId="+user._id)
                
                if(response.error){
                    console.log(response.error)
                }
                
                setUserChats(response)
            }
        }
        fetchData()
    },[user,userChats])
    useEffect(()=>{
        const getMessage = async ()=>{
                
                const response = await getRequest(messageUrl+"/getMessage?chatId="+currentChat?._id)
                
                if(response.error){
                    console.log(response.error)
                }
                
                setMessage(response)
            
        }
        if(currentChat){
        getMessage()
                    
        }
    },[currentChat])
    const sendMessage = useCallback(async (text,sender,chatId,setTextMessage)=>{
        if(!text) return console.log('type sth')
        const response = await postRequest(`${messageUrl}/createMessage`,JSON.stringify({
            chatId,
            senderId:sender,
            text    
        }))
            if(response.error){
                return console.log(response.error)
            }
            console.log('zzz:',response)
            setNewMessage(response)
            setTextMessage("")
            setMessage((prev)=>{
                console.log('sendMessage:',prev)
                return [...prev,response]})
            
    },[])

    const createChat = useCallback((firstId,secondId)=>{
        const create = async ()=>{//if chat exist dont create
            const response = await postRequest(`${chatUrl}/createChat`,JSON.stringify({
                firstId,
                secondId
            }))
            if(response.error){
                res.status(400).json('error at create chat')
            }
            setUserChats((prev)=>[...prev,response])
        }
        create()
    },[])

    return <ChatContext.Provider value={{
        userChats,
        setUserChats,
        pChat,
        setPChat,
        createChat,
        updateCurrentChat,
        message,
        currentChat,sendMessage,
        onlineUser,
        socket
        
    }}>{children}</ChatContext.Provider>
}
 
export default ChatContextProvider;