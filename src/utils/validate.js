const validator= require('validator')
const apiError = require('./apiError')

const validate= (data)=>{
    const mandatoryFields= ['firstname', 'email', 'password']
    const isAllowed= mandatoryFields.every((k)=> Object.keys(data).includes(k))

    if(!isAllowed)
    {
        throw new apiError(400, 'All fields are required')
    }

    if(!validator.isEmail(data.email))
    {
        throw new apiError(400, 'Invalid email')
    }

    if(!validator.isStrongPassword(data.password))
    {
        throw new apiError(400, 'Weak password')
    }
}

module.exports= validate