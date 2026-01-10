import mongoose, {Schema} from 'mongoose';

const LessonModel = Schema(
    {
        sectionID : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Section'
        },
        title : {
            type : String,
            required : true
        },
        videoUrl : {
            type : String,
            required : true
        },
        duration : {
            type : Number,
            required : true
        },
        order : {
            type : Number 
        }
    },
    {timestamps : true}
);

export const Lesson = mongoose.model('Lesson', LessonModel);