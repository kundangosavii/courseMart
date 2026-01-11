import mongoose, {Schema} from "mongoose";

const lessonProgressSchema = Schema(
    {
        userID : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User'
        },
        lessonID : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Lesson'
        },
        progress : {
            type : String,
            enum : ['not started', 'started', 'completed'],
            required : true
        }
    },
    {timestamps: true}
);

export const LessonProgress = mongoose.model('LessonProgress', lessonProgressSchema);