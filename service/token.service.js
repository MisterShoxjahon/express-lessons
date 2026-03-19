import jwt from 'jsonwebtoken'
import tokenModel from '../models/token.model.js'

class tokenService {
	generateTokens(payload) { // payload - the info we want to save and to be hidden in the token
		const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET_KEY, {expiresIn: "15m"})
		const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET_KEY, {expiresIn: "30d"})

		return {accessToken, refreshToken}
	}

	async saveToken(userId, refreshToken) {
		const existingToken = await tokenModel.findOne({user: userId})
		if(!existingToken) {
			const existingToken = await tokenModel.create({user: userId, refreshToken})
			return existingToken
		}
		existingToken.refreshToken = refreshToken // we are updating the token in tokenModel to the new one 
		return existingToken.save()
	}
}

export default new tokenService()