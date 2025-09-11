const User = require("../models/user.model");
const apiError = require("../utils/apiError");
const asyncHandler = require("../utils/asyncHandler");
const jwt= require('jsonwebtoken')

const verifyJWT= asyncHandler(async (req, _, next)=>{
    const token= req.cookies?.accessToken || req.header('Authorization')?.replace('Bearer ', '')

    if(!token)
    {
        throw new apiError(401, "Unauthorized request")
    }

    const decodedToken= jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

    const user= await User.findById(decodedToken?._id).select('-password')
    if(!user)
    {
        throw new apiError(401, 'Invalid Access token')
    }

    req.user= user
    next()
})

module.exports= verifyJWT