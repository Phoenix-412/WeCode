const express= require('express')
const verifyJWT= require('../middlewares/auth.middleware')
const solveDoubt = require('../controllers/aiChat.controller')

const router= express.Router()

router.route('/chat').post(verifyJWT, solveDoubt)

module.exports= router