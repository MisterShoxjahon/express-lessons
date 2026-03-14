const requestTime = function(req, res, next) { // next is a callback function that we need to call to pass the control to the next middleware function in the stack
	req.requestTime = Date.now();
	next()
}		

export default requestTime;