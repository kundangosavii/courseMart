import mongoose, {Schema} from 'mongoose';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
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
        },
        refreshToken : {
            type: String
        }

    },
    {timestamps : true}
);

UserModel.pre("save", async function(next) {
    if(!this.isModified("password")) return next()

    this.password = await bcrypt.hash("password",10)
    
})

UserModel.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare("password", this.password)
}

UserModel.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            Email: this.Email,
            Name: this.Name,
            role: this.role
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

UserModel.methods.generateRefershToken = function(){
    return jwt.sign(
        {
            _id : this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        }
    )
    
}

export const User = mongoose.model('User', UserModel)