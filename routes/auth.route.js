import express from 'express'
import AuthController from '../controllers/auth.controller.js'
import { body } from 'express-validator'
import authMiddleWare from '../middlewares/auth.middleware.js'

const router = express.Router()
const authController = new AuthController()

const email = body('email').isEmail()
const password = body('password').isLength({ min: 3, max: 30 })

router.post('/register', email, password, authController.register.bind(authController))
router.get('/activation/:id', authController.activation.bind(authController))
router.post('/login', email, password,  authController.login.bind(authController))
router.post('/logout', email, password, authController.logout.bind(authController))
router.get('/refresh', email, password, authController.refresh.bind(authController))
router.get('/get-users', authMiddleWare, authController.getUser.bind(authController)) // those who passed authorization successfully
	
export default router