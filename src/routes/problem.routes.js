const express= require('express')
const verifyJWT= require('../middlewares/auth.middleware')
const adminAuth = require('../middlewares/adminAuth.middleware')
const { createProblem, updateProblem, deleteProblem, fetchProblem, fetchAllProblem, solvedProblem } = require('../controllers/problem.controller')

const router= express.Router()

//secured routes
router.route('/create').post(adminAuth, createProblem)

router.route('/update/:problemId').put(adminAuth, updateProblem)
router.route('/delete/:problemId').delete(adminAuth, deleteProblem)
router.route('/problemById/:problemId').get(verifyJWT, fetchProblem)
router.route('/getAllProblems').get(verifyJWT, fetchAllProblem)

router.route('/problemsSolved').get(verifyJWT, solvedProblem)

module.exports= router