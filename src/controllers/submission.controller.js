const asyncHandler= require('../utils/asyncHandler')
const apiError= require('../utils/apiError')
const apiResponse= require('../utils/apiResponse')
const Problem = require('../models/problem.model')
const Submission = require('../models/submission.model')
const { getLanguageId, submitBatch, submitToken } = require('../utils/judge0')

const submitCode= asyncHandler(async (req, res)=>{
    const userId= req.user._id
    const { problemId }= req.params

    const { code, language }= req.body

    if(!code || !language || [code, language].some( (field)=> field.trim()===''))
    {
        throw new apiError(400, 'All fields are required')
    }

    const problem= await Problem.findById(problemId)
    if(!problem)
    {
        throw new apiError(404, 'Problem not found')
    }

    const submittedResult= await Submission.create({
        userId,
        problemId,
        code,
        language,
        totalTestCases: problem.hiddenTestCases.length
    })
    if(!submittedResult)
    {
        throw new apiError(500, 'Something went wrong while submitting the code')
    }

     const language_id= getLanguageId(language)

    const submissions= problem.hiddenTestCases.map((testcase)=>(
        {
            language_id,
            source_code: code,
            stdin: testcase.input,
            expected_output: testcase.output
        }
    ))

    const submitResult= await submitBatch(submissions)

    const resultToken= submitResult.map((value)=> value.token)

    const result= await submitToken(resultToken)

    let status= 'accepted'
    let runtime= 0
    let memory= 0
    let testCasesPassed= 0
    let errorMessage= null

    for(const test of result)
    {
        if(test.status_id===3)
        {
            testCasesPassed++
            runtime= runtime+ parseFloat(test.time)
            memory= Math.max(memory, test.memory)
        }
        else if(test.status_id===4)
        {
            status= 'wrong'
            errorMessage= test.stderr
        }
        else
        {
            status= 'error'
            errorMessage= test.stderr
        }
    }

    submittedResult.status= status
    submittedResult.runtime= runtime
    submittedResult.memory= memory
    submittedResult.errorMessage= errorMessage
    submittedResult.testCasesPassed= testCasesPassed

    await submittedResult.save()

    return res.status(201)
              .json(new apiResponse(201, submittedResult, 'Code submitted successfully'))
})

module.exports= {
                    submitCode,
                }