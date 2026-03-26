import authService from '../service/auth.service.js'

class AuthController {
    async register(req, res, next) {
        try {
            const {email, password} = req.body
            const data = await authService.register(email, password)
            res.cookie('refreshToken', data.refreshToken, {httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000, secure: false})
            return res.json(data)
        } catch (error) {
            return res.status(400).json({error: error.message})
        }
    }

    async activation(req, res, next) {
        try {
            const userId = req.params.id
            await authService.activation(userId)
            return res.redirect(process.env.CLIENT_URL)
        } catch (error) {
            return res.status(400).json({error: error.message})
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body
            const data = await authService.login(email, password)
            res.cookie('refreshToken', data.refreshToken, {httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000, secure: false})
            return res.json(data)
        } catch (error) {
            return res.status(400).json({error: error.message})
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            // console.log(refreshToken);
            const token = await authService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json({token}) 
        } catch (error) {
            return res.status(400).json({error: error.message})
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const data = await authService.refresh(refreshToken)
            res.cookie('refreshToken', data.refreshToken, {httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000, secure: false})
            return res.json(data)
        } catch (error) {
            return res.status(400).json({error: error.message})
        }
    }
}

export default AuthController