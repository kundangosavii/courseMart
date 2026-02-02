import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import {Course} from '../models/course.model.js';

const getAllCourses = asyncHandler(async(req, res) => {
    const allCourses = await Course.find({"isPublished" : true}).limit(10)

    return res
    .status(200)
    .json(
        new ApiResponse(200, allCourses, "All courses get successfully")
    )
});


export {
    getAllCourses
}