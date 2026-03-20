import UserDto from '../dtos/user.dto.js'
import User from '../models/user.model.js'
import bcrypt from 'bcrypt'
import tokenService from './token.service.js'
import mailService from './mail.service.js'

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
}

export default new AuthService()