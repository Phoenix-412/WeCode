const express= require('express')
const verifyJWT= require('../middlewares/auth.middleware')
const adminAuth = require('../middlewares/adminAuth.middleware')
const { createProblem } = require('../controllers/problem.controller')

const router= express.Router()

//secured routes
router.route('/create').post(adminAuth, createProblem)
// router.route('/').get(verifyJWT, fetchAllProblem)

// router
//     .route('/:problemId')
//     .get(verifyJWT, fetchProblem)
//     .patch(adminAuth, updateProblem)
//     .delete(adminAuth, deleteProblem)

// router.route('/:userId').get(verifyJWT, solvedProblem)

module.exports= router