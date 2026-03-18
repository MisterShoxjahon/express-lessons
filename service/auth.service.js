import UserDto from '../dtos/user.dto.js'
import User from '../models/user.model.js'
import bcrypt from 'bcrypt'

class AuthService {
	async register(email, password) {
		const existingUser = await User.findOne({email})

		if(existingUser) {
			throw new Error(`User with this email: ${email} already exists`)
		}

		const hashedPassword = await bcrypt.hash(password, 10)
		const user = await User.create({email, password: hashedPassword})
		// email service 

		// jwt generation
		const userDto = new UserDto(user)

		// token
		return {userDto} 
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

export default AuthService