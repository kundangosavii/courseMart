import mongoose, {Schema} from 'mongoose';

const UserModel = Schema(
    {
        Name : {
            type : String,
            required : true,
            trim : true
        },
        Email : {
            type : String,
            required : true,
            trim : true,
            lowercase : true
        },
        role : {
            type : String,
            enum : ['Student', 'Educator', 'Admin'],
            required : true
        },
        password : {
            type : String,
            min : [6, 'Password must be 6 character long'],
            max : 15,
            required : true,
        }

    },
    {timestamps : true}
);

export const User = mongoose.model('User', UserModel)