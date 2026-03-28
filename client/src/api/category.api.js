import api from "./axios"

export const createCategory=async(formData)=>{
    const res=await api.post(`/category`,formData,{
        withCredentials:true
    })
    return res.data.category
}

export const getAllCategories=async()=>{
    const res=await api.get(`/category`)
    return res.data.category
}

export const getSingleCategory=async(id)=>{
    const res=await api.get(`/category/${id}`)
    return res.category
}

export const updateCategory=async(id)=>{
    const res=await api.patch(`/category/${id}`,{
        withCredentials:true
    })
    return res.updatedCategory
}

export const deleteCategory=async(id)=>{
    const res=await api.delete(`/category/${id}`,{
        withCredentials:true
    })
    return res.data
}