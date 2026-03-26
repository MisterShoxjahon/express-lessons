import UserDto from '../dtos/user.dto.js'
import User from '../models/user.model.js'
import bcrypt from 'bcrypt'
import tokenService from './token.service.js'
import mailService from './mail.service.js'
import userModel from '../models/user.model.js'

class AuthService {
	async register(email, password) {
		const existingUser = await User.findOne({email})

		if(existingUser) {
			throw new Error(`User with this email: ${email} already exists`)
		}

		const hashedPassword = await bcrypt.hash(password, 10)
		const user = await User.create({email, password: hashedPassword})
		const userDto = new UserDto(user)
		// email service 
		await mailService.sendMail(email, `${process.env.API_URL}/api/auth/activation/${userDto.id}`)

		// jwt generation
		const tokens = tokenService.generateTokens({...userDto})

		// token
		await tokenService.saveToken(userDto.id, tokens.refreshToken)
		return { user: userDto, ...tokens} 
	}

	async activation(userId) {
		const user = await User.findById(userId)
		if(!user) {
			throw new Error('User not found')
		}

		user.isActivated = true
		await user.save() 
	}

	async login(email, password) {
		const user = await userModel.findOne({email})
		if(!user) {
			throw new Error('User is not defined')
		}

		const isPassword = await bcrypt.compare(password, user.password) // it compares password to user's hashed password in it's own way.
		if(!isPassword) {
			throw new Error('The password is incorrect!')
		}

		const userDto = new UserDto(user)

		const tokens = tokenService.generateTokens({...userDto})

		await tokenService.saveToken(userDto.id, tokens.refreshToken)
		return { user: userDto, ...tokens} 
	}

	async logout(refreshToken) {
		return await tokenService.removeToken(refreshToken)
	}

	async refresh(refreshToken) {
	console.log('TOKEN:', refreshToken)

	if (!refreshToken) {
		throw new Error('No token provided')
	}

	const userPayload = tokenService.validateRefreshToken(refreshToken)
	console.log('PAYLOAD:', userPayload)

	const tokenDb = await tokenService.findToken(refreshToken)
	console.log('DB TOKEN:', tokenDb)

	if (!userPayload) {
		throw new Error('Invalid token')
	}

	if (!tokenDb) {
		throw new Error('Token not found in DB')
	}

	const user = await User.findById(userPayload.id)
	const userDto = new UserDto(user)

	const tokens = tokenService.generateTokens({ ...userDto })

	await tokenService.saveToken(userDto.id, tokens.refreshToken)

	return { user: userDto, ...tokens }
}
}

export default new AuthService()