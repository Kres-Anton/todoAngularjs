let HttpError = require('../error').HttpError;
let jwt =require('jsonwebtoken');
let config=require('../config/index');

module.exports = function(req, res, next) {
	console.log(req.path);
	if(req.path==='/api/login'){
		return next();
	}

    if (!req.headers.authorization) {
    	return res.status(403).json({ 
		        success: false, 
		        message: 'No token provided.' 
		});
    }

    if (req.headers.authorization){
    	let token = req.headers.authorization.split('Bearer ')[1];
    	if (token) {
		    jwt.verify(token, config.get('jwtword'), function(err, decoded) {      
		      if (err) {
		      	console.log(err);
		        return res.json({ success: false, message: 'Failed to authenticate token.' });    
		      } else {
		        req.decoded = decoded;    
		        next();
		      }
    		});

  		} else {
		    return res.status(403).json({ 
		        success: false, 
		        message: 'No token provided.' 
			});

		}
	}

    
};