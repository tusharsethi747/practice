import mongoose, { mongo } from "mongoose";
import bcrypt from "bcrypt";
import { Users } from "./Models/UserModel.js";
import express from "express"
import { CreateToken, JwtAuth } from "./JWT/jwtAuth.js";
import { Posts } from "./Models/PostModel.js";
import { config } from "dotenv";
import cors from "cors"

config();

const PORT=process.env.PORT;
const URL=process.env.URL;

const app=express();
app.use(express.json());
app.use(cors());

app.post('/signup',async (req,res)=>{
    try{
        const UsernameCheck=await Users.findOne({username:req.body.username});
        const EmailCheck= await Users.findOne({email:req.body.email});

        if(UsernameCheck){
            return res.status(400).send({msg:`Username already exist , please choose another username !! `,status:false});
        }
        if(EmailCheck){
            return res.status(400).send({msg:'Email already exist,please choose another email !!',status:false});
        }

        const HashedPassword=await bcrypt.hash(req.body.password,12);
        const NewUser={
            username:req.body.username,
            email:req.body.email,
            password:HashedPassword
        }
        const UserCreated=await Users.create(NewUser);
        const PayLoad={
            username:req.body.username,
            email:req.body.email,
            id:UserCreated._id
        }
        const token=CreateToken({PayLoad});
        return res.status(200).json({user:UserCreated,token:token,Payload:PayLoad,msg:`user created successfully !!`})
    }
    catch(error){
        console.log(`error occured !! `);
        return res.status(400).send({msg:error.message});
    }
})

app.post(`/login`,async (req,res)=>{
    try{
        const MyUser=await Users.findOne({username:req.body.username});
        if(!MyUser){
            return res.status(400).send(`No user exists with this username!!`);
        }
        
        const UserPassword= await bcrypt.compare(req.body.password,MyUser.password);
        if(UserPassword==false){
            return res.status(400).send(`this password is wrong `);
        }

        const PayLoad={
            username:MyUser.username,
            email:MyUser.email ,
            id:MyUser._id
        }

        const token=CreateToken({PayLoad});
        return res.status(200).json({msg:`login successfull`,token:token,Payload:PayLoad, status:true});
    }
    catch(error){
        console.log(`error found !! `);
        return res.status(400).json({msg:error.message});
    }
})

app.get('/user/posts',async(req,res)=>{
    try {
        // Replace with dynamic username if needed
        const username = "krishav";
        
        // Find the user and populate the Blogs field
        const user = await Users.findOne({ username }).populate({
            path: "Blogs",
            select: "title content createdAt" // Select fields you want to retrieve
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user.Blogs);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
})

app.get('/posts',async (req,res)=>{
    try{
        const AllPosts=await Posts.find({});
        const TotalPosts=AllPosts.length;

        return res.status(200).json({TotalPosts,AllPosts});
    }
    catch(error){
        console.log(`error occured !! `);
        return res.status(400).json({msg:error.message});
    }
})

app.get('/posts/:id',async (req,res)=>{
    try{ 
        const MyPost=await Posts.findById(req.params.id);
        if(!MyPost){
            return res.status(400).json({msg:"no post with this id"});
        }
        return res.status(200).json({MyPost})
    }
    catch(error){
        console.log(`error occured !! `);
        return res.status(400).json({msg:error.message});
    }
})

app.post('/posts',JwtAuth,
    async (req,res)=>{
    try{
        if(!req.body.title || !req.body.content ){
            return res.status(400).json({msg:'Please enter all the fields !!'});
        }
        // console.log(`i am in index`,req.user.UserPayload.id);

        console.log(req.user.PayLoad);
        const NewPost={
            title:req.body.title,
            content:req.body.content,
            Author: req.user.PayLoad.username
        }
        console.log(`this is new post`,NewPost);
        console.log(`this is  id`, req.user.PayLoad.id);

        const PostCreated= await Posts.create(NewPost);

        console.log(`this is id of PostCreated `, PostCreated._id);
        await Users.findByIdAndUpdate(req.user.PayLoad.id, {
            $push: { Blogs: PostCreated._id }
        });
        return res.status(200).send(PostCreated);
    }
    catch(error){
        console.log(`error occured !! `);
        return res.status(400).json({msg:error.message});
    }
})

app.put('/posts/:id',async (req,res)=>{
    try{
        const id=req.params.id;
        const MyNewPost=await Posts.findByIdAndUpdate(id,req.body);
        if(!MyNewPost){
            return res.status(400).send(`No such post with the given id !! `);
        }
        return res.status(200).json({msg:`post updated successfully!!`});
    }
    catch(error){
        console.log(`error occured !! `);
        return res.status(400).json({msg:error.message});
    }
})

app.delete('/posts/:id',JwtAuth,async (req,res)=>{
    try{
        const id=req.params.id;
        console.log(id);
        
        const MyNewPost=await Posts.findByIdAndDelete(id);
        if(!MyNewPost){
            return res.status(400).send(`No such post with the given id !! `);
        }
        return res.status(200).json({msg:`post deleted successfully !!`})
    }
    catch(error){
        console.log(`error occured !! `);
        return res.status(400).json({msg:error.message});
    }
})

mongoose.connect(URL)
.then(()=>{
    const server=app.listen(PORT,()=>{
        console.log(`Server listening on port no ${PORT}`);
    })
})
.catch((err)=>{
    console.log(`error found ... can't connect you to backend !!`)
    console.log(err.message);
})