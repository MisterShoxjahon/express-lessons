import BaseError from '../errors/base.error.js'
import authService from '../service/auth.service.js'
import {validationResult} from 'express-validator'

class AuthController {
	async register(req, res, next) {
		try {
			const errors = validationResult(req)
			if(!errors.isEmpty()) {
				return next(BaseError.BadRequest('Error with validation', errors.array()))
			}
			const { email, password } = req.body
			const data = await authService.register(email, password)	
			res.cookie('refreshToken', data.refreshToken, {
				httpOnly: true,
				maxAge: 30 * 24 * 60 * 60 * 1000,
				secure: false,
			})
			return res.json(data)
		} catch (error) {
			next(error)
		}
	}

	async activation(req, res, next) {
		try {
			const userId = req.params.id
			await authService.activation(userId)
			return res.redirect(process.env.CLIENT_URL)
		} catch (error) {
			next(error)
		}
	}

	async login(req, res, next) {
		try {
			const errors = validationResult(req)
			if(!errors.isEmpty()) {
				return next(BaseError.UnAuthorizedError('Wrong password or email', errors.array()))
			}
			const { email, password } = req.body
			const data = await authService.login(email, password)
			res.cookie('refreshToken', data.refreshToken, {
				httpOnly: true,
				maxAge: 30 * 24 * 60 * 60 * 1000,
				secure: false,
			})
			return res.json(data)
		} catch (error) {
			next(error)
		}
	}

	async logout(req, res, next) {
		try {
			const errors = validationResult(req)
			if(!errors.isEmpty) {
				return next(BaseError.BadRequest('Failed to log out', errors.array()))
			}
			const { refreshToken } = req.cookies
			const token = await authService.logout(refreshToken)
			res.clearCookie('refreshToken')
			return res.json({ token })
		} catch (error) {
			next(error)
		}
	}

	async refresh(req, res, next) {
		try {
			const errors = validationResult(req)
			if(!errors.isEmpty) {
				return next(BaseError.BadRequest('Failed to refresh', errors.array()))
			}
			const { refreshToken } = req.cookies
			const data = await authService.refresh(refreshToken)
			res.cookie('refreshToken', data.refreshToken, {
				httpOnly: true,
				maxAge: 30 * 24 * 60 * 60 * 1000,
				secure: false,
			})
			return res.json(data)
		} catch (error) {
			next(error)
		}
	}

	async getUser(req, res, next) {
		try {
			const data = await authService.getUsers()
			return res.json(data)
		} catch (error) {
			next(error)
		}
	}
}

export default AuthController
