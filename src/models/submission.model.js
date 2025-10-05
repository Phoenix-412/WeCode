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

/*
'_id' and fields with 'unique:true' have their own indexing
We can add indexing to a particular field by-> 'index:true'
*/

//Compound indexing-
submissionSchema.index({userId: 1, problemId: 1})
/*
Here we have created our own indexing using two fields userId and problemId where the index is applied after
sorting the fields firstly on the basis of userId and then on the basis of problemId, for example-
userId  problemId
4       9
4       10
4       10
5       7
6       8

Here we also have an added advantage that if we search on the basis of userId then it will take less time due to
indexing
*/

const Submission= mongoose.model('Submission', submissionSchema)
module.exports= Submission