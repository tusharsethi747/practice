import mongoose from "mongoose"

const UserSchema=mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    Blogs:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Posts' // Ensure this references your Posts or Blog model
    }]
},{timestamps:true})

export const Users=mongoose.model("Users",UserSchema);