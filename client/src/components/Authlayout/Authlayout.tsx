import { useState , useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { RootState } from "../../Store/store"
import React from "react"

export default function Authlayout({ children , authentication = true }) {
    const navigate = useNavigate()
    const [loader , setLoader] = useState(true)
    const authstatus = useSelector((state  :RootState ) => state.auth.status) 
    
    useEffect(() => { 
        if(authentication && authstatus !== authentication) { 
            navigate('/login')
        }else if (!authentication && authstatus !== authentication) {
            navigate('/')
        }

        setLoader(false)  
    } , [navigate , authstatus , authentication])
 

    return loader ? <div className="flex justify-center items-center min-h-screen font-bold text-blue-600">...Loading</div> : 
    <div className="flex  min-h-screen items-center justify-center">
        {children}
    </div>
}