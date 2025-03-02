import { createContext, useCallback, useMemo, useState } from "react";
import { baseUrl, postRequest } from "../service/service";
import {io} from 'socket.io-client'

export const AuthContext = createContext()

const AuthContextProvider = ({children}) => {
    const [user,setUser] = useState(null)
    const [registerError,setRegisterError] = useState(null)
    const [loginError,setLoginError] = useState(null)

    const [isRegisterLoading,setIsRegisterLoading] = useState(false)

    const [registerInfo,setRegisterInfo] = useState({
        name:"",
        email:"",
        password:""
    })
    const [loginInfo,setLoginInfo] = useState({
        email:"",
        password:""
    })
    const updateRegisterInfo = useCallback((info)=>{
        setRegisterInfo(info)
    },[])
    const updateLoginInfo = useCallback((info)=>{
        
        setLoginInfo(info)
    },[])
    // console.log(registerInfo)
    const registerUser = useCallback(async(e)=>{
        e.preventDefault()
        setIsRegisterLoading(true)
        const res = await postRequest(baseUrl+"/register",JSON.stringify(registerInfo))
        setIsRegisterLoading(false)
        if(res.error){
           return setRegisterError(res)
        }
        setUser(res)
        
    },[registerInfo])
    const logOutUser = useCallback(()=>{
        setUser(null)
    },[])
    const loginUser = async (e)=>{
        e.preventDefault()
       const res = await postRequest(baseUrl+"/login",JSON.stringify(loginInfo))
       if(res.error){
        console.log(res)
        return setLoginError(res)
     }
     console.log(res)
     setUser(res)
    }
    return (
        <AuthContext.Provider value={{
            user,
            registerInfo,
            updateRegisterInfo,
            registerUser,
            registerError,
            logOutUser,
            loginUser,
            updateLoginInfo,
            loginInfo,
            loginError

            }}>
            {children}
        </AuthContext.Provider>
    );
}
 
export default AuthContextProvider
