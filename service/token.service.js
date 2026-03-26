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
		existingToken.refreshToken = refreshToken
		return existingToken.save()
	}

	async removeToken(refreshToken) {
		return await tokenModel.findOneAndDelete({refreshToken})
	}

	async findToken(refreshToken) {
		return await tokenModel.findOne({refreshToken})
	}

	validateRefreshToken(token) {
		try {
			return jwt.verify(token, process.env.JWT_REFRESH_SECRET_KEY)
		} catch (error) {
			return null
		}
	}

	validateAccessToken(token) {
		try {
			return jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY)
		} catch (error) {
			return null
		}
	}
}

export default new tokenService()