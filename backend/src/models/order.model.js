import mongoose, {mongo, Schema} from 'mongoose'

const orderSchema = Schema(
    {
        userID : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User'
        },
        courseID : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Course'
        },
        amount : {
            type : Number,
            required : true
        },
        paymentStatus : {
            type : String,
            enum : ['failed', 'pending', 'successful'],
            required : true
        },
        paymentGateway : {
            type : String,
            required : true
        }
    },
    {timestamps: true}
);

export const Order = mongoose.model('Order', orderSchema);