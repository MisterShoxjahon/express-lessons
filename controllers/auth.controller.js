import authService from '../service/auth.service.js'

class AuthController {
    async register(req, res, next) {
        try {
            const {email, password} = req.body
            const data = await authService.register(email, password)
            res.cookie('refreshToken', data.refreshToken, {httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000, secure: true})
            return res.json(data)
        } catch (error) {
            return res.status(400).json({error: error.message})
        }
    }

    async activation(req, res, next) {
        try {
            const userId = req.params.id
            await authService.activation(userId)
            return res.redirect('https://sammi.ac')
        } catch (error) {
            console.log(error);
        }
    }
}

export default AuthController