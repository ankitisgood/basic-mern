import jwt from 'jsonwebtoken'; 
import userModel from "../models/userModel.js";

const authMiddleware = async (req, res, next) => {
    // console.log(req.cookies)
    const token  = req.cookies.jwt;
    // const token1  = req.cookies;
    // console.log('this is token from auth.js ',token)
    // console.log('this is token2 from auth.js ',token1)
    let user;
    if (!token) {
        return res.json({success:false,message:'Not Authorized Login Again'});
    }
    try {
        const token_decode =  jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
    } catch (error) {
        return res.json({success:false,message:error.message});
    }

    try {
    user = await userModel.findById(req.body.userId);
    if (!user) {
      return res.status(401).json({ status: false, msg: "User not found" });
    }

    req.user = user;
    next();
    } catch (error) {
    console.error(error);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
    }
}

export default authMiddleware;