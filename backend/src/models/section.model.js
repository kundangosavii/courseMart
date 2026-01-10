import mongoose, {Schema} from "mongoose";

const SectionModel = Schema(
    {
        couseID : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Course"
        },
        title : {
            type : String,
            required : true
        },
        order : {
            type : Number
        }
    }
);

export const Section = mongoose.model('Section', SectionModel);