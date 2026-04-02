import BaseError from '../errors/base.error.js'
import tokenService from '../service/token.service.js'

export default function AuthMiddleWare(req, res, next) {
	try {
		const authorization = req.headers.authorization
		if(!authorization) {
			return next(BaseError.UnAuthorizedError())
		}

		const accessToken = authorization.split(" ")[1]
		if(!accessToken) {
			return next(BaseError.UnAuthorizedError())
		}

		const userData = tokenService.validateAccessToken(accessToken)
		if(!userData) {
			return next(BaseError.UnAuthorizedError())
		}

		req.user = userData
		next()
	} catch (error) {
		return next(BaseError.UnAuthorizedError())
	}
}
