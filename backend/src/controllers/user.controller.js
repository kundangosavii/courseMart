import {ApiResponse} from '../utils/ApiResponse.js';
import {ApiError} from '../utils/ApiError.js';
import {asynHandler} from '../utils/asyncHandler.js';
import {User} from '../models/user.model.js';

const registerUser = asynHandler( async(req, res) => {
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

    return res.status(400).json(
         new ApiResponse(402, createdUser, "User registered succesfully")
    );
});

export {
    registerUser
}