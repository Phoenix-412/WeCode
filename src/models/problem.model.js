const mongoose= require('mongoose')
const {Schema}= mongoose

const problemSchema= new Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    difficulty:{
        type: String,
        required: true,
        enum: ['easy', 'medium', 'hard']
    },
    tags:{
        type: String,
        required: true
    },
    visibleTestCases:[
        {
            input:{
                type: String,
                required: true
            },
            output:{
                type: String,
                required: true
            },
            explanation:{
                type: String,
                required: true
            }
        }
    ],
    hiddenTestCases:[
        {
            input:{
                type: String,
                required: true
            },
            output:{
                type: String,
                required: true
            }
        }
    ],
    startCode:[
        {
            language:{
                type: String,
                required: true
            },
            initialCode:{
                type: String,
                required: true
            }
        }
    ],
    referenceSolution:[
        {
            language:{
                type: String,
                required: true
            },
            completeCode:{
                type: String,
                required: true
            }
        }
    ],
    creator:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},
{
    timestamps: true
})

const Problem= mongoose.model('Problem', problemSchema)
module.exports= Problem