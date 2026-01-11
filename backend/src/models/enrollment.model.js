import mongoose, {Schema} from "mongoose";

const enrollmentSchema = Schema(
    {
        userID : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User'
        },
        courseID : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Course'
        },
        enrollAt : {
            type : Date,
            required : true
        },
        expiresAt : {
            type : Date,
            required : true
        }
    },
    {timestamps : true}
);

export const Enrollment = mongoose.model('Enrollment', enrollmentSchema);