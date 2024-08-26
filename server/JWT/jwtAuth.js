import jwt from "jsonwebtoken";

export const CreateToken=(userData)=>{
    return jwt.sign(userData,process.env.JWT_SECRET);
}

export const JwtAuth=(req,res,next)=>{
    const authorization=req.headers.authorization;
    if(!authorization) return res.status(401).json({error:`token not found `});
    const token=authorization.split(" ")[1];

    // console.log('Authorization Header:',authorization);
    
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        // console.log(decoded);
        // console.log(token);
        req.user=decoded;

        next();
    }
    catch(err){
        return res.status(401).json({error:'invalid token '});
    }

}