import mongoose, {Schema} from 'mongoose';
import bcrypt from 'bcrypt'
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

UserModel.pre('save', async function(next){
    if(!this.isModified('password')) return next()
    
    this.password = await bcrypt.hash(this.password, 10)
    next()

})

UserModel.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare ("password", this.password)
}

export const User = mongoose.model('User', UserModel)