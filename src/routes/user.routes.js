const express= require('express')
const verifyJWT= require('../middlewares/auth.middleware')
const {register, login, logout, adminRegister}= require('../controllers/user.controller')
const adminAuth = require('../middlewares/adminAuth.middleware')

const router= express.Router()

router.route('/register').post(register)
router.route('/login').post(login)

//secured routes
router.route('/logout').post(verifyJWT, logout)
router.route('/admin/register').post(adminAuth, adminRegister)
//router.route('/getProfile').get(verifyJWT, getProfile)

module.exports= router