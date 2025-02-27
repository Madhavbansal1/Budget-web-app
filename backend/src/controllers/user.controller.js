import ApiError from "../utils/ApiError.js";
import User from "../models/user.model.js";
import ApiResponse from "../utils/ApiResponse.js";

const signup = async (req, res) => {
    try {
        const { firstName, lastName, imgUrl, email, clerkId } = req.body;

        if (!email || !clerkId) {
            throw new ApiError(400, "Email and Clerk ID are required");
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(200).json(new ApiResponse(200, existingUser, "User logged in successfully"));
        }

        // Create a new user
        const newUser = await User.create({
            firstName: firstName?.toLowerCase(),
            lastName: lastName?.toLowerCase(),
            imgUrl,
            email,
            clerkId
        });

        // Find the newly created user
        const createdUser = await User.findOne({ clerkId });
        if (!createdUser) {
            throw new ApiError(500, "Error while registering user");
        }

        return res.status(201).json(new ApiResponse(201, createdUser, "User registered successfully"));
    } catch (error) {
        return res.status(error.statusCode || 500).json(new ApiError(error.statusCode || 500, error.message));
    }
};

const update = async (req, res) => {
    try {
        const { firstName, lastName, imgUrl, email, clerkId, password } = req.body;

        if (!clerkId) {
            throw new ApiError(400, "Clerk ID is required");
        }

        const updatedUser = await User.findOneAndUpdate(
            { clerkId },
            { firstName, lastName, imgUrl, email, password },
            { new: true } // Ensures the updated document is returned
        );

        if (!updatedUser) {
            throw new ApiError(404, "User not found");
        }

        return res.status(200).json(new ApiResponse(200, updatedUser, "User updated successfully"));
    } catch (error) {
        return res.status(error.statusCode || 500).json(new ApiError(error.statusCode || 500, error.message));
    }
};

const form  = async(req,res)=>{
    try {
        const token = req.header.authorisation
        if (!token || !token.startsWith("Bearer ")) {
            throw new ApiError(401, "No token provided");
        }

        const clerkId = token.split(" ")[1];

        const {role} = req.body
        if(!role){
            throw new ApiError(401, "No role provided");
        }

        const updateUser = await User.findOneAndUpdate({clerkId},{role});

        return res.status(200).json(new ApiResponse(200,updateUser,"role added successfully"));
        
    } catch (error) {
        return res.status(error.statusCode || 500).json(new ApiError(error.statusCode || 500, error.message))
    }
};



export { signup , update, form};
