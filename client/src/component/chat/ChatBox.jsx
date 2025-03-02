import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { FetchRecepientUser } from "../../hooks/fetchRecipientUser";
import { Stack } from "react-bootstrap";
import InputEmoji from "react-input-emoji";
import moment from "moment";
const ChatBox = () => {
    const { user } = useContext(AuthContext)
    const { currentChat, message,sendMessage } = useContext(ChatContext)
    const { recepientUser } = FetchRecepientUser(currentChat, user)
    const [textMessage, setTextMessage] = useState("")
    const messagesRef = useRef(null);
    
    useEffect(() => {
    const container = messagesRef.current;
    console.log(container)
    if (container) {
        container.scrollTop = container.scrollHeight;
    }
    }, [message]);



    return (
        <>
            {recepientUser == null ? (
                <p style={{ textAlign: 'center', width: '100%', color: 'white' }}>
                    no conversation

                </p>
            ) : (
                <Stack gap={4} className="chat-box">
                    <div className="chat-header">
                        <strong>{recepientUser.name}</strong>
                    </div>
                    <Stack gap={3} className="messages overflow-auto" ref={messagesRef}>
                        {message &&
                            message?.map((mes, index) => (
                                <Stack key={index}
                                    className={`${mes?.senderId == user?._id ? "message self align-self-end flex-grow-0" : "message align-self-start flex-grow-0"}`}
                                >
                                    <span>{mes?.text}</span>
                                    <span className="message-footer">{moment(mes?.createdAt).calendar()}</span>
                                </Stack>
                            ))
                        }

                    </Stack>
                    <Stack direction="horizontal" gap={3} className="chat-input flex-grow-0">
                        <InputEmoji value={textMessage} onChange={setTextMessage}
                            borderColor="rgba(72,112,223,0.2)"
                        />
                        <button className="send-btn" onClick={()=>sendMessage(textMessage,user?._id,currentChat?._id,setTextMessage)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
                                <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
                            </svg>
                        </button>
                    </Stack>
                </Stack>
            )}
        </>
    );
}

export default ChatBox;