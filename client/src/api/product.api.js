import api from "./axios"

export const createProduct=async(formdata)=>{
    const res=await api.post(`/product`,formdata,{
        withCredentials:true
    })

    return res.data.data
}

export const getAllProducts=async()=>{
    const res=await api.get(`/product`)
    return res.data.data
}

export const getSingleProduct=async(id)=>{
    const res=await api.get(`/product/${id}`)
    return res.data.data
}

export const updateProduct=async(id, formdata)=>{
    const res=await api.patch(`/product/${id}`, formdata, {
        withCredentials:true,
        headers: { "Content-Type": "multipart/form-data" },
    })
    return res.data.data
}
export const deleteProduct=async(id)=>{
    const res=await api.delete(`/product/${id}`,{
        withCredentials:true
    })
    return res.data
}

export const getProductByCategory=async(categoryId)=>{
    const res=await api.get(`/product/category/${categoryId}`)

    return res.data.data
}

export const getFeaturedProduct=async()=>{
    const res=await api.get(`/product/featured`)

    return res.data.data
}
export const getSaleProduct=async()=>{
    const res=await api.get(`/product/sale`)

    return res.data.data
}