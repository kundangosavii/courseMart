import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import {Course} from '../models/course.model.js';
import { Section } from "../models/section.model.js";
import {Lesson} from "../models/lesson.model.js"

const getAllCourses = asyncHandler(async(req, res) => {
    try {
        const allCourses = await Course.find({"isPublished" : true}).limit(10)
    
        return res
        .status(200)
        .json(
            new ApiResponse(200, allCourses, "All courses get successfully")
        )
    } catch (error) {
        throw new ApiError(500, "Internal server error")
    }
});

const getCourseDetails = asyncHandler(async(req, res) => {
    try {
        const courseId = req.params._id
        const course = await Course.findOne({
            _id : courseId,
            isPublished : true
        })

        if(!course){
            throw new ApiError(404, "Course Not Found")
        }

        const courseSections = await Section.find({ courseId }).sort({order: 1})

        const sectionIds = courseSections.map((s) => s._id)
        const sectionLessons = await Lesson.find(
            {
                sectionId : { $in: sectionIds }
            }
        ).sort({order:1})

        const courseContent = courseSections.map((section) => {
            return {
                _id :section._id ,
                title : section.title,

                lessons : sectionLessons
                .filter((l)=>l.sectionId.toString() === section._id.toString())
                .map((l)=>({
                    _id : l._id,
                    title : l.title,
                    duration : l.duration
                }))
            }
        })

        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    course: {
                        _id : course._id,
                        title : course.title,
                        description: course.description,
                        thumbnail : course.thumbnail,
                        price : course.price,
                        educatorId : course.educatoId

                    },
                    Content : courseContent,
                    enrolled : false,
                    progress : 0
                },
                "Returning all course data successfully"
            )
        )
        


        
    } catch (error) {
        
    }
})



export {
    getAllCourses,
    getCourseDetails
}