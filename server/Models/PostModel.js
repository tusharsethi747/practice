import mongoose from "mongoose";

const PostSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    Author:{
        type:String,
        required:true 
    }
},{timestamps:true})

export const Posts=mongoose.model("Posts",PostSchema);