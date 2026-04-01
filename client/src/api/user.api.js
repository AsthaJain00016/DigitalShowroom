import api from "./axios"

export const registerUser=async(formData)=>{

    const res=await api.post(`/users/register`,formData,{
        withCredentials:true
    })
    // console.log(res.data.user)
    return res.data.data
}

export const loginUser= async(payload)=>{
   const res= await api.post(`/users/login`,payload)
   return res.data.data
}

export const getCurrentUser=async()=>{
    const res=await api.get(`/users/me`,{
        withCredentials:true
    })
    return res.data.data
}

export const logout=async()=>{
    return res=await api.post(`/users/logout`,{},{
        withCredentials:true
    })
}