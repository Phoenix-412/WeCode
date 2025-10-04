const express= require('express')
const verifyJWT= require('../middlewares/auth.middleware')
const adminAuth = require('../middlewares/adminAuth.middleware')
const { submitCode } = require('../controllers/submission.controller')

const router= express.Router()

router.route('/:problemId').post(verifyJWT, submitCode)

module.exports= router