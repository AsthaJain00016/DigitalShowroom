import api from "./axios"

const createProduct=async(formdata)=>{
    const res=await api.post(`/product`,formdata,{
        withCredentials:true
    })

    return res.data.product
}

const getAllProducts=async()=>{
    const res=await api.get(`/product`)
    return res.data.product
}

const getSingleProduct=async(id)=>{
    const res=await api.get(`/product/${id}`)
    return res.data.product
}

const updateProduct=async(id)=>{
    const res=await api.patch(`/product/${id}`,{
        withCredentials:true
    })
    return res.data.updatedProduct
}
const deleteProduct=async(id)=>{
    const res=await api.delete(`/product/${id}`,{
        withCredentials:true
    })
    return res.data
}
