import mongoose,{Schema} from "mongoose";

const categorySchema=new Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    image:{
        type:String,
        required:true,
        trim:TransformStreamDefaultController
    }
},
{
    timestamps:true
})


export const Category=mongoose.model("Category",categorySchema)