import BaseError from '../errors/base.error.js'

export function ErrorMiddleWare(err, req, res, next) {
	console.error('ERROR:', err)

	if (!err) {
		return res.status(500).json({ message: 'Unknown error' })
	}

	if (err instanceof BaseError) {
		return res.status(err.status).json({
			message: err.message,
			errors: err.errors
		})
	}

	return res.status(500).json({
	message: err.message || 'Server error'
})
}
