import mongoose,{Schema} from "mongoose";
import  bcrypt from 'bcrypt'

const userSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        match: [/.+\@.+\..+/, "Please use a valid email"]
    },
    phone:{
        type:String,
        required:true,
        trim:true
    },
    address:{
        type:String,
        required:true,
        trim:true
    },
    role:{
        type:String,
        enum:["admin"],
        default:"admin"
    },
    password:{
        type:String,
        required:true,
        minlength:6
    }
},
{
    timestamps:true
}
)

userSchema.pre('save',async function(){
    if(!this.isModified('password')) return ;

    this.password=await bcrypt.hash(this.password,10)
})

userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}



export const User=mongoose.model("User",userSchema)