import {ApiResponse} from '../utils/ApiResponse.js';
import {ApiError} from '../utils/ApiError.js';
import {asyncHandler} from '../utils/asyncHandler.js';
import {User} from '../models/user.model.js';

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

    console.log(Email);
    console.log(password);
    
    
    const findUser = await User.findOne({
        $or : [{Email}]
    });

    console.log(findUser);
    

    if(!findUser){
        throw new ApiError(401, "please register before");
    }

    const checkPassword = await findUser.isPasswordCorrect(password)
    if(!checkPassword){
        throw new ApiError(402, "Invaild Credintials")
    }

    const loggedInUser = await User.findById(findUser._id).select(" -password")

    return res.status(200).json(
        new ApiResponse(200, loggedInUser, "login successful")
    )
})

export {
    registerUser,
    loginUser
}