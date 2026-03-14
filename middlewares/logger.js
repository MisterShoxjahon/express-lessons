const logger = function(req, res, next) {
	console.log('Post request');
	next()
}

export default logger;