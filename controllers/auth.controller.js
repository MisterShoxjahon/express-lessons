import authService from '../service/auth.service.js'

class AuthController {
    async register(req, res, next) {
        try {
            const {email, password} = req.body
            const data = await authService.register(email, password)
            res.cookie('refreshToken', data.refreshToken, {httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000, secure: true}) // we getting the method cookie from res and we can set the cookie in the browser, we will set the refresh token in the cookie, because it is more secure to store it in the cookie than in local storage, because it is http only and it is not accessible from the client side, so it is more secure to store it in the cookie than in local storage
            // 30 days, 24 hours, 60 minutes, 60 seconds, 1000 milliseconds
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