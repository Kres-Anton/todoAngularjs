let User = require("../models/user").User;
let HttpError = require('../error').HttpError;
let jwt =require('jsonwebtoken');
let async=require('async');
let util=require('util');
let config=require('../config/index');

exports.post = (req, res, next)=>{
	if (!req.body.username || !req.body.password) {
        res.status(404).json({ 
            success: false, 
            message: "Need for username and password in request." 
        });
    }

	let username = req.body.username;
	let password = req.body.password;
  console.log(req.body);
    async.waterfall([
        (callback)=>{
                User.findOne({username:username},callback);            
        },
        (user,callback)=>{
            if (user) {
                if (user.checkPassword(password)) {                    
                    jwt.sign({ user:user,iat: Math.floor(Date.now() / 1000) + 60*60 }, config.get('jwtword'), (err, token)=>{
                       res.send({
                      			user:{
                      				id:user._id,
                      				username:user.username,
                      				created:user.created,
                      				role:user.role,
                      				photo:user.photo
                      				}
                      			,token:token
                            ,success: true
                      		});
                    });
                    
                } else {
                    res.json({ 
                      success: false, 
                      message: "Wrong password." 
                    });
                }
            } else {

                 let user = new User({username:username,password:password});
                user.save((err)=>{
                    if (err) return callback(err);
                    jwt.sign({ user:user,iat: Math.floor(Date.now() / 1000) + 60*60 }, config.get('jwtword'), (err, token)=>{
                      res.send({
                      			user:{
                      				id:user._id,
                      				username:user.username,
                      				created:user.created,
                      				role:user.role,
                      				photo:user.photo
                      				}
                      			,token:token
                            ,success: true
                      		});
                    });
                });
            }
        }
    ],(err, user)=>{
        if (err) return next(err);

        return user;
    });

    
};

function authError(message){
    Error.apply(this,arguments);
    Error.captureStackTrace(this,authError);

    this.message=message;
}

util.inherits(authError,Error);

authError.prototype.name = 'authError';

exports.authError = authError;