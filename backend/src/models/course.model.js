import mongoose, {Schema} from "mongoose";

const CourseModel = Schema(
    {
        title : {
            type : String,
            trim : true,
            required : true
        },
        description : {
            type : String,
            required : true
        },
        thumbnail :{
            type : String,
            required : true
        },
        price : {
            type : Number,
            min : 0,
            required : true
        },
        educatorId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User'
        },
        isPublished : {
            type : Boolean,
        }

    },
    {timestamps : true}
);

export const Course = mongoose.model('Course', CourseModel);