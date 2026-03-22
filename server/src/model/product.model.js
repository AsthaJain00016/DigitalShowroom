    import mongoose ,{model, Schema} from "mongoose";

    const productSchema=new Schema({
        name:{
            type:String,
            required:true,
            trim:true
        },
        price:{
            type:Number,
            required:true,
            min:0
        },
        description:{
            type:String,
            required:true,
            trim:true
        },
        category:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Category",
            required:true
        },
        images:[{
            type:String,
            required:true,
            trim:true
        },],
        stock:{
            type:Number,
            default:0
        },
        isFeatured:{
            type:Boolean,
            default:false
        }
    },
    {
        timestamps:true
    })

    export const Product=mongoose.model("Product",productSchema)