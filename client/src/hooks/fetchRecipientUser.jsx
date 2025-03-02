import { useEffect, useState } from "react";
import { baseUrl, getRequest } from "../service/service";

 export const FetchRecepientUser =  (chat,user) => {
    const [recepientUser,setRecepientUser] = useState(null)
    
    const recepientId = chat?.members?.find((id)=>id !== user?._id)
    useEffect(()=>{
       
        const getRecepientUser = async ()=>{
            if(!recepientId) return null
            try{
                const response = await getRequest(`${baseUrl}/find/${recepientId}`)
                
                setRecepientUser(response)
            }catch(e){
                console.log('error at hook fetch recepient:',e)
            }
           
        }
        
            getRecepientUser()

        
    },[recepientId])
    return {recepientUser};
}

