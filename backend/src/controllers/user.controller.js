import ApiError from "../utils/ApiError.js";
import User from "../models/user.model.js"
import ApiResponse from "../utils/ApiResponse.js";


const signup = async(req,res)=>{
    const {firstName,lastName,imgUrl,email,clerkId} = req.body;
    if(!email || !clerkId ){
        throw new ApiError(502,"email and id required")
    }
    const user = await User.findOne({email});
    if(user){
        throw new ApiError(401,"user exit already")
    }
    const newUser = await User.create({
        firstName:firstName.toLowerCase(),
        lastName:lastName.toLowerCase(),
        imgUrl,
        email,
        clerkId
    })

    await newUser.save();

    const createUser = await User.findOne({clerkId})
    if(!createUser){
        throw new ApiError(502,"error while register")
    }

    return res.status(201).json(new ApiResponse(201,createUser,"user register successfully"))
}

export {
    signup
}