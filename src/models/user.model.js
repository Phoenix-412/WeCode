const mongoose= require('mongoose')
const {Schema}= mongoose

const userSchema= Schema({
    firstname:{
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20
    },
    lastname:{
        type: String,
        minLength: 3,
        maxLength: 20
    },
    email:{
        type: String,
        required: route,
        unique: true,
        lowercase: true,
        trim: true,
        immutable: true
    },
    age:{
        type: Number
    },
    role:{
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    problemSolved:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Problem'
        }
    ],
    password:{
        type: String,
        required: [true, 'Password is required']    //'Password is required'->custom error message
    }
},
{
    timestamps: true
})

const User= mongoose.model('User', userSchema)
module.exports= User