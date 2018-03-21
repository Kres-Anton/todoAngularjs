let User = require("../models/user").User;

exports.post = (req, res, next)=>{
	if(!req.body.user) res.send({msg:'need for user in body',success:false});

	let newUser = new User();

	for (var key in JSON.parse(req.body.user)){
		newUser[key]=req.body.user[key];
	}

	newUser.save((err,user)=>{
		if (err) res.send({err: err, success: false});
		let data={
                      				id:user._id,
                      				username:user.username,
                      				created:user.created,
                      				role:user.role,
                      				photo:user.photo
                      				};
            	res.send({user: data, success: true});
				});
	}

exports.get= (req, res, next)=>{

	if (!req.params.id){
		User.find({},(err, users)=>{
			if (err) res.send({err: err, success: false});
			if(users){
				let data=users.map((user)=>{
				return {
                      				id:user._id,
                      				username:user.username,
                      				created:user.created,
                      				role:user.role,
                      				photo:user.photo
                      				}
				});
				res.send({users: data, success: true});
			};

				res.send({users: null, success: false});
		});

	} else {
		User.findOne({_id:req.params.id},(err, user)=>{
			if (err) res.send({err: err, success: false});
			if(user){
				let data={
                      				id:user._id,
                      				username:user.username,
                      				created:user.created,
                      				role:user.role,
                      				photo:user.photo
                      				};
            	res.send({user: data, success: true});
				} else {
					res.send({users: null, success: false});
				};
			});
		};
}

exports.delete = (req,res,next)=>{
	if(!req.body.user) res.send({msg:'need for user in body',success:false});

	let user = JSON.parse(req.body.user);

	User.remove({_id:user.id},(err,user)=>{
		if (err) res.send({err: err, success: false});
		if(user){
				let data={
      				id:user._id,
      				username:user.username,
      				created:user.created,
      				role:user.role,
      				photo:user.photo
      				};
            	res.send({user: data, success: true});
				};

		res.send({user: null, success: false});
		});

}



exports.put = (req,res,next)=>{
	if(!req.body.user) res.send({msg:'need for user in body',success:false});

	let user = JSON.parse(req.body.user);

	let newUser = new User({username:user.username,password:user.password});
	 newUser.save((err)=>{
			 if (err) return callback(err);

			 res.send({
						 user:{
							 id:newUser._id,
							 username:newUser.username,
							 created:newUser.created,
							 role:newUser.role,
							 photo:newUser.photo
							 }
						 ,success: true
					 });
	 });

}
