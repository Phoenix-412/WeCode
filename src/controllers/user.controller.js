const asyncHandler= require('../utils/asyncHandler')
const User= require('../models/user.model')
const apiError= require('../utils/apiError')
const apiResponse= require('../utils/apiResponse')
const validate= require('../utils/validate')
const bcrypt= require('bcrypt')
const jwt= require('jsonwebtoken')
const redisClient = require('../db/redis')

const generateAccessToken= (userId, email)=>{
    const accessToken= jwt.sign(
            {
                _id: userId,
                email
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

    const {firstname, lastname, age, email, password}= req.body

    const hashPassword= await bcrypt.hash(password, 10)

    const user= await User.create({
        firstname,
        lastname: lastname || '',
        age: age || null,
        email,
        password: hashPassword
    })

    const accessToken= generateAccessToken(user._id, email)
    const days= parseInt(process.env.ACCESS_TOKEN_EXPIRY[0])
    const options={
        httpOnly: true,
        secure: true,
        maxAge: days*24*60*60*1000  //it is the time to live of the token which should be in milliseconds
    }

    res.status(201)
       .cookie('accessToken', accessToken, options)
       .json(
            new apiResponse(
                201, 
                {
                    _id: user._id,
                    firstname,
                    email,
                    accessToken
                }, 
                'User registered successfully'
            )
        )
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

    const accessToken= generateAccessToken(user._id, email)
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

    await redisClient.set(`token:${token}`, 'Blocked')
    await redisClient.expireAt(`token:${token}`, payload.exp)

    res.status(200)
        .cookie('accessToken', null, {expires: new Date(Date.now())})
        .json(new apiResponse(200, {}, 'User Logged Out'))
})

module.exports= {
                    register,
                    login,
                    logout,
                }