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
        
    const findUser = await User.findOne({
        $or : [{Email}]
    });

    console.log(findUser);
    

    if(!findUser){
        throw new ApiError(401, "please register before");
    }

    const passwordvaildation =await findUser.isPasswordCorrect(password)         // don't access the method using User beacuse it is mongo user your user is {user} if your using and mongodb quary then use {User} this is object of mongo therefor and to apply your own methods use {user} your are taking the instance of the of mongo object
    if(!passwordvaildation){
        throw new ApiError(401, "invaild password credintial")
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