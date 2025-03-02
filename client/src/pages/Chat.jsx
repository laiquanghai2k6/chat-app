import { useContext } from "react";
import {ChatContext} from "../context/ChatContext"
import { Container, Stack } from "react-bootstrap";
import UserCard from "../component/chat/UserChat";
import { AuthContext } from "../context/AuthContext";
import PotentialChat from "../component/chat/PotentialChat";
import ChatBox from "../component/chat/ChatBox";


const Chat = () => {
    const {user} = useContext(AuthContext)
    const { userChats,setPChat,updateCurrentChat } = useContext(ChatContext)
    console.log()
    return (
        <Container>
            <PotentialChat />
            
            {userChats?.length < 1 ? null : (
                <Stack direction="horizontal" gap={4} className="align-item-start">
                    <Stack className="message-box flex-grow-0 pe-3">
                        {userChats?.map((chat,index)=>{
                            return(
                                <div key={index} onClick={()=>updateCurrentChat(chat)}>

                                    <UserCard chat={chat} user={user} /> 
                                </div>
                            )
                        })}
                    </Stack>
                    
                    <ChatBox />

                </Stack>
             )} 

        </Container>
    );
}

export default Chat;