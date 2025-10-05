const express= require('express')
const verifyJWT= require('../middlewares/auth.middleware')
const adminAuth = require('../middlewares/adminAuth.middleware')
const { submitCode, runCode } = require('../controllers/submission.controller')

const router= express.Router()

router.route('/submit/:problemId').post(verifyJWT, submitCode)
router.route('/run/:problemId').post(verifyJWT, runCode)

module.exports= router