import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";



const PotentialChat = () => {
    const {user} = useContext(AuthContext)
    
    const {pChat,createChat,onlineUser} = useContext(ChatContext)
    console.log('user from potential:',user)
    console.log(user?._id)
   
    return (  
        <>
            <div className="all-users">
                {pChat &&
                pChat.map((u,index)=>(
                    <div className="single-user" key={index} onClick={()=>createChat(user?._id,u?._id)}>
                        {u?.name}
                        <span className={onlineUser?.some((user)=>user.userId ==u?._id) ? "user-online" : ""} ></span>
                    </div>
                ))
                }
            </div>
        </>
    );
}

export default PotentialChat