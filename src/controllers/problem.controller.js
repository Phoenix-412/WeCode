const asyncHandler= require('../utils/asyncHandler')
const apiError= require('../utils/apiError')
const apiResponse= require('../utils/apiResponse')
const {getLanguageId, submitBatch, submitToken} = require('../utils/judge0')
const Problem = require('../models/problem.model')

const createProblem= asyncHandler(async (req, res)=>{
    const {title, description, difficulty, tags, visibleTestCases, hiddenTestCases, startCode, referenceSolution}= req.body

    /*
    this loop checks whether the reference solution provided by the admin is correct or not on the basis of the
    provided testcases
    */
    for(const {language, completeCode} of referenceSolution)
    {
        const language_id= getLanguageId(language)

        const submissions= visibleTestCases.map((testcase)=>(
            {
                language_id,
                source_code: completeCode,
                stdin: testcase.input,
                expected_output: testcase.output
            }
        ))

        const submitResult= await submitBatch(submissions)

        const resultToken= submitResult.map((value)=> value.token)
        
        const result= await submitToken(resultToken)
        
        for(const test of result)
        {
            if(test.status_id!=3)
            {
                return res.status(400)
                          .json(new apiResponse(400, test.status_id, 'Error Occurred'))
            }
        }
    }

    /*
    Since the loop is completed which means the reference solution is correct hence we can add the problem to
    the database
    */
   const newProblem= await Problem.create({
        ...req.body,
        creator: req.user._id
   })
   if(!newProblem)
   {
        throw new apiError(500, 'Something went wrong while registering the problem')
   }

   return res.status(201)
             .json(new apiResponse(201, newProblem, 'Problem registered successfully'))
})

const updateProblem= asyncHandler(async (req, res)=>{
    const {problemId}= req.params

    if(!problemId)
    {
        throw new apiError(400, 'Id is required')
    }

    const problem= await Problem.findById(problemId)
    if(!problem)
    {
        throw new apiError(404, 'Problem not found')
    }

    const {title, description, difficulty, tags, visibleTestCases, hiddenTestCases, startCode, referenceSolution, creator}= req.body

    for(const {language, completeCode} of referenceSolution)
    {
        const language_id= getLanguageId(language)

        const submissions= visibleTestCases.map((testcase)=>(
            {
                language_id,
                source_code: completeCode,
                stdin: testcase.input,
                expected_output: testcase.output
            }
        ))

        const submitResult= await submitBatch(submissions)

        const resultToken= submitResult.map((value)=> value.token)
        
        const result= await submitToken(resultToken)
        
        for(const test of result)
        {
            if(test.status_id!=3)
            {
                return res.status(400)
                          .json(new apiResponse(400, test.status_id, 'Error Occurred'))
            }
        }
    }

    const updatedProblem= await Problem.findByIdAndUpdate(
        problemId,
        {...req.body},
        {runValidators: true, new: true}
    )
    //runValidators-> it runs all the validators that we have added in the model like enum, minLength etc.

    return res.status(200)
              .json(new apiResponse(200, updatedProblem, 'Problem updated successfully'))
})

const deleteProblem= asyncHandler(async (req, res)=>{
    const {problemId}= req.params

    if(!problemId)
    {
        throw new apiError(400, 'Id is required')
    }

    const deletedProblem= await Problem.findByIdAndDelete(problemId)
    if(!deletedProblem)
    {
        throw new apiError(404, 'Problem not found')
    }

    return res.status(200)
              .json(new apiResponse(200, deletedProblem, 'Problem deleted successfully'))
})

const fetchProblem= asyncHandler(async (req, res)=>{
    const {problemId}= req.params

    if(!problemId)
    {
        throw new apiError(400, 'Id is required')
    }

    const problem= await Problem.findById(problemId).select('-hiddenTestCases -referenceSolution -creator')
    if(!problem)
    {
        throw new apiError(404, 'Problem not found')
    }

    return res.status(200)
              .json(new apiResponse(200, problem, 'Problem fetched successfully'))
})

const fetchAllProblem= asyncHandler(async (req, res)=>{
    const allProblems= await Problem.find({}).select('_id title difficulty tags')
    if(!allProblems.length===0)
    {
        throw new apiError(404, 'Problems not found')
    }

    return res.status(200)
              .json(new apiResponse(200, allProblems, 'All problems fetched successfully'))
})

module.exports= {
                    createProblem,
                    updateProblem,
                    deleteProblem,
                    fetchProblem,
                    fetchAllProblem,
                }