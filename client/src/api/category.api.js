    import api from "./axios"

    export const createCategory=async(formData)=>{
        const res=await api.post(`/category`,formData,{
            withCredentials:true
        })
        return res.data.data
    }

    export const getAllCategories=async()=>{
        const res=await api.get(`/category`)
        console.log("Category api called", res.data)
        return res.data.data
    }

    export const getSingleCategory=async(id)=>{
        const res=await api.get(`/category/${id}`)
        return res.data.data
    }

    export const updateCategory=async(id)=>{
        const res=await api.patch(`/category/${id}`,{
            withCredentials:true
        })
        return res.data.data
    }

    export const deleteCategory=async(id)=>{
        const res=await api.delete(`/category/${id}`,{
            withCredentials:true
        })
        return res.data
    }