import express from 'express'
import AuthController from '../controllers/auth.controller.js'

const router = express.Router()
const authController = new AuthController()

router.post('/register', authController.register.bind(authController))
router.get('/activation/:id', authController.activation.bind(authController))
router.post('/login', authController.login.bind(authController))
router.post('/logout', authController.logout.bind(authController))
router.get('/refresh', authController.refresh.bind(authController)) // generates every 15 minutes new access token through refreshToken

export default router  