const asyncHandler= require('../utils/asyncHandler')
const User= require('../models/user.model')
const apiError= require('../utils/apiError')
const apiResponse= require('../utils/apiResponse')
const validate= require('../utils/validate')
const bcrypt= require('bcrypt')
const jwt= require('jsonwebtoken')
const redisClient = require('../db/redis')
const Submission= require('../models/submission.model')

const generateAccessToken= (userId, email, role)=>{
    const accessToken= jwt.sign(
            {
                _id: userId,
                email,
                role
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRY
            }
        )
    return accessToken;
}

const register= asyncHandler(async (req,res)=>{
    validate(req.body)

    const {firstname, lastname, age, email, password, role}= req.body

    const hashPassword= await bcrypt.hash(password, 10)

    const user= await User.create({
        firstname,
        lastname: lastname || '',
        age: age || null,
        role: 'user',
        email,
        password: hashPassword
    })
    if(!user)
    {
        throw new apiError(500, 'Something went wrong while registering the user')
    }

    const createdUser= await User.findById(user._id).select('-password')
    if(!createdUser)
    {
        throw new apiError(500, 'Something went wrong while fetching the registered user')
    }

    const accessToken= generateAccessToken(user._id, email, 'user')
    const days= parseInt(process.env.ACCESS_TOKEN_EXPIRY[0])
    const options={
        httpOnly: true,
        secure: true,
        maxAge: days*24*60*60*1000  //it is the time to live of the token which should be in milliseconds
    }

    res.status(201)
       .cookie('accessToken', accessToken, options)
       .json(new apiResponse(201, createdUser, 'User registered successfully'))
})

const login= asyncHandler(async (req, res)=>{
    const {email, password}= req.body
    if(!email || !password)
    {
        throw new apiError(400, 'All fields are required')
    }

    const user= await User.findOne({email})
    if(!user)
    {
        throw new apiError(404, 'User does not exist')
    }

    const isPasswordValid= await bcrypt.compare(password, user.password)
    if(!isPasswordValid)
    {
        throw new apiError(401, 'Invalid user credentials')
    }

    const accessToken= generateAccessToken(user._id, email, user.role)
    const days= parseInt(process.env.ACCESS_TOKEN_EXPIRY[0])
    const options={
        httpOnly: true,
        secure: true,
        maxAge: days*24*60*60*1000
    }

    return res
            .status(200)
            .cookie('accessToken', accessToken, options)
            .json(
                new apiResponse(
                    200,
                    {
                        _id: user._id,
                        firstname: user.firstname,
                        email: user.email,
                        accessToken   
                    },
                    'User logged-in successfully'
                )
            )
})

const logout= asyncHandler(async (req, res)=>{
    const token= req.cookies?.accessToken

    const payload= jwt.decode(token)

    const tokenSet= await redisClient.set(`token:${token}`, 'Blocked')
    const tokenExpiry= await redisClient.expireAt(`token:${token}`, payload.exp)
    
    if(tokenSet!=='OK' || tokenExpiry!==1)
    {
        throw new apiError(503, 'Invalid token')
    }

    res.status(200)
        .cookie('accessToken', null, {expires: new Date(Date.now())})
        .json(new apiResponse(200, {}, 'User Logged Out'))
})

const adminRegister= asyncHandler(async (req, res)=>{
    validate(req.body)

    const {firstname, lastname, age, email, password, role}= req.body

    const hashPassword= await bcrypt.hash(password, 10)

    const admin= await User.create({
        firstname,
        lastname: lastname || '',
        age: age || null,
        role: 'admin',
        email,
        password: hashPassword
    })
    if(!admin)
    {
        throw new apiError(500, 'Something went wrong while registering the admin')
    }

    const createdAdmin= await User.findById(admin._id).select('-password')
    if(!createdAdmin)
    {
        throw new apiError(500, 'Something went wrong while fetching the registered admin')
    }

    const accessToken= generateAccessToken(admin._id, email, 'admin')
    const days= parseInt(process.env.ACCESS_TOKEN_EXPIRY[0])
    const options={
        httpOnly: true,
        secure: true,
        maxAge: days*24*60*60*1000  //it is the time to live of the token which should be in milliseconds
    }

    res.status(201)
       .cookie('accessToken', accessToken, options)
       .json(new apiResponse(201, createdAdmin, 'Admin registered successfully'))
})

const deleteProfile= asyncHandler(async (req, res)=>{

    const userId= req.user._id

    const deletedUser= await User.findByIdAndDelete(userId)
    if (!deletedUser)
    {
        throw new apiError(404, "User not found")
    }

    await Submission.deleteMany({userId})

    return res.status(200)
              .json(new apiResponse(200, 'Deleted successfully'))
})

module.exports= {
                    register,
                    login,
                    logout,
                    adminRegister,
                    deleteProfile,
                }