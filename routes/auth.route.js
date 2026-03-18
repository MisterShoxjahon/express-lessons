import express from 'express'
import AuthController from '../controllers/auth.controller.js'

const router = express.Router()
const authController = new AuthController()

router.post('/register', authController.register.bind(authController))
router.get('/activation/:id', authController.activation.bind(authController))

export default router