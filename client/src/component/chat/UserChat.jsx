import { useContext } from "react";
import {FetchRecepientUser} from "../../hooks/fetchRecipientUser";
import {Stack} from 'react-bootstrap'
import { ChatContext } from "../../context/ChatContext";
const UserCard = ({chat,user}) => {
  
    const {onlineUser} = useContext(ChatContext)
    const {recepientUser} = FetchRecepientUser(chat,user)
    
   
    return (
        <Stack direction="horizontal"
        gap={3}
        className="user-card align-items-center p-2 justify-content-between"
        >
          <div className="d-flex">
            <div className="me-2">A</div>
            <div className="text-content">
              <div className="name">{recepientUser?.name}</div>
              <div className="text">Text message</div>
            </div>
          </div>
          <div className="d-flex flex-column align-items-end">
            <div className="date">12/12/2024</div>
            <div className="this-user-notification">2</div>
            <span className={onlineUser?.some((u)=>u.userId ==recepientUser?._id) ? "user-online" : ""}></span>
          </div>
        </Stack>
      );
}
 
export default UserCard;