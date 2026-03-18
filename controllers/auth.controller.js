import AuthService from '../service/auth.service.js'

const authService = new AuthService()

class AuthController {
    async register(req, res, next) {
        try {
            const {email, password} = req.body
            const data = await authService.register(email, password)
            return res.json(data)
        } catch (error) {
            return res.status(400).json({error: error.message})
        }
    }

    async activation(req, res, next) {
        try {
            const userId = req.params.id
            await authService.activation(userId)
            return res.json({message: 'Account successfully activated'})
        } catch (error) {
            console.log(error);
        }
    }
}

export default AuthController