export const baseUrl = 'https://chat-app-backend-af5w.onrender.com/api/users'
export const chatUrl = 'https://chat-app-backend-af5w.onrender.com/api/chat'
export const messageUrl = 'https://chat-app-backend-af5w.onrender.com/api/message'
export const postRequest = async(url,body)=>{
    const response = await fetch(url,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body
    })
    const data = await response.json()
    if(!response.ok){
        let message = data;
        return {error:true,message}
    }
    return data
}

export const getRequest = async(url)=>{
    const response = await fetch(url)
    const data = await response.json()
    if(!response.ok){
        let message = data;
        return {error:true,message}
    }
    
    return data
}