import {ApiResponse} from '../utils/ApiResponse.js';
import {ApiError} from '../utils/ApiError.js';
import {asyncHandler} from '../utils/asyncHandler.js';
import {User} from '../models/user.model.js';
import jwt from 'jsonwebtoken';

const generateAccessAndRefreshToken = async(userId) => {
    try {
        const user =await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefershToken();
    
        user.refreshToken = refreshToken;
        return {accessToken, refreshToken}
    }  catch (error) {
        
    }
    
}

const registerUser = asyncHandler( async(req, res) => {
    const {Name, Email, role, password} = req.body;

    if(
        [Name, Email, role, password].some((field) => field?.trim === '')
    ){
        throw new ApiError(400, "Each fields are required");
    };

    const userResgistered = await User.findOne({
        $or : [{Name}, {Email}]
    });

    if(userResgistered){
        throw new ApiError(401, "User already registered")
    };

    const user = await User.create({
        Name,
        Email,
        role,
        password
    });

    const createdUser = await User.findById(user._id).select(
        " -password"
    );
    if(!createdUser){
        throw new ApiError(502, "Something went wrong")
    };

    return res.status(201).json(
         new ApiResponse(201, createdUser, "User registered succesfully")
    );
});

const loginUser = asyncHandler(async(req, res)=>{
    const {Email, password} = req.body;

    if(!Email || !password){
        throw new ApiError(404, "All fields are required")
    };
        
    const findUser = await User.findOne({
        $or : [{Email}]
    });

    if(!findUser){
        throw new ApiError(401, "please register before");
    }

    const passwordvaildation =await findUser.isPasswordCorrect(password);   
    if(!passwordvaildation){
        throw new ApiError(401, "invaild password credintial")
    }
 
    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(findUser._id);

    const loggedInUser = await User.findById(findUser._id).select(" -password -refreshToken");

    const options = {
        httpOnly : true,
        secure : true
    };

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {
                loggedInUser, accessToken, refreshToken
            },
            "User logged in successfully"
        )
    )

});

const logoutUser = asyncHandler(async(req, res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set :{
                refreshToken: undefined
            }
        },
        {
            new : true
        }
    )

    const options = {
        httpOnly : true,
        secure : true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(200, {}, "User logout successfully")
})

export {
    registerUser,
    loginUser,
    logoutUser
}