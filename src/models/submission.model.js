const mongoose= require('mongoose')
const {Schema}= mongoose

const submissionSchema= new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    problemId: {
        type: Schema.Types.ObjectId,
        ref: 'Problem',
        required: true
    },
    code:{
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true,
        enum: ['javascript', 'java', 'c++', 'python']
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'wrong', 'error'],
        default: 'pending'
    },
    runtime: {
        type: Number,
        default: 0
    },
    memory: {
        type: Number,
        default: 0
    },
    errorMessage: {
        type: String,
        default: ''
    },
    testCasesPassed: {
        type: Number,
        default: 0
    },
    totalTestCases: {
        type: Number,
        default: 0
    }
},
{
    timestamps: true
})

const Submission= mongoose.model('Submission', submissionSchema)
module.exports= Submission