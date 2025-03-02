export const baseUrl = 'http://127.0.0.1:5000/api/users'
export const chatUrl = 'http://127.0.0.1:5000/api/chat'
export const messageUrl = 'http://127.0.0.1:5000/api/message'
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