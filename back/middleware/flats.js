let Flat = require("../models/flat").Flat;

exports.post = (req, res, next)=>{
	if(!req.body.flat) res.send({msg:'need for flat in body',success:false});

	let newFlat = new Flat();

	for (var key in JSON.parse(req.body.flat)){
		newFlat[key]=req.body.flat[key];
	}

	newFlat.save((err,flat)=>{
		if (err) res.send({err: err, success: false});
		let data={
                      				id:flat._id,
                      				flatName:flat.flatName,
                      				city:flat.city,
                              street:flat.street,
                              house:flat.house,
                              flatNumber:flat.flatNumber,
                      				created:flat.created,
                      				people:flat.people,
                              square:flat.square,
                              ownerId:flat.ownerId
                      				};
            	res.send({flat: data, success: true});
				});
	};

exports.get= (req, res, next)=>{

	if (!req.params.id){
		Flat.find({},(err, flats)=>{
			if (err) res.send({err: err, success: false});
			if(falts){
				let data=flats.map((flat)=>{
                                  {
                          				id:flat._id,
                          				flatName:flat.flatName,
                          				city:flat.city,
                                  street:flat.street,
                                  house:flat.house,
                                  flatNumber:flat.flatNumber,
                          				created:flat.created,
                          				people:flat.people,
                                  square:flat.square,
                                  ownerId:flat.ownerId
                          				}
				});
				res.send({flat: data, success: true});
			};

				res.send({flat: null, success: false});
		});

	} else {
		Flat.findOne({_id:req.params.id},(err, flat)=>{
			if (err) res.send({err: err, success: false});
			if(flat){
				let data={
                          				id:flat._id,
                          				flatName:flat.flatName,
                          				city:flat.city,
                                  street:flat.street,
                                  house:flat.house,
                                  flatNumber:flat.flatNumber,
                          				created:flat.created,
                          				people:flat.people,
                                  square:flat.square,
                                  ownerId:flat.ownerId
                          				};
            	res.send({flat: data, success: true});
				} else {
					res.send({flat: null, success: false});
				};
			});
		};
};

exports.delete = (req,res,next)=>{
	if(!req.body.flat) res.send({msg:'need for flat in body',success:false});

	let flat = JSON.parse(req.body.flat);

	Flat.remove({_id:flat.id},(err,flat)=>{
		if (err) res.send({err: err, success: false});
		if(flat){
				let data={
                          				id:flat._id,
                          				flatName:flat.flatName,
                          				city:flat.city,
                                  street:flat.street,
                                  house:flat.house,
                                  flatNumber:flat.flatNumber,
                          				created:flat.created,
                          				people:flat.people,
                                  square:flat.square,
                                  ownerId:flat.ownerId
                          				};
            	res.send({flat: data, success: true});
				};

		res.send({flat: null, success: false});
		});

};



exports.put = (req,res,next)=>{
	if(!req.body.flat) res.send({msg:'need for flat in body',success:false});

	let flat = JSON.parse(req.body.flat);

	let newFlat = new Flat(
    {
      flatName:flat.flatName,
      city:flat.city,
      street:flat.street,
      house:flat.house,
      flatNumber:flat.flatNumber,
      people:flat.people,
      square:flat.square,
      ownerId:flat.ownerId
    });
	 newFlat.save((err)=>{
			 if (err) return callback(err);

			 res.send({
						 flat:{
                               				id:newFlat._id,
                               				flatName:newFlat.flatName,
                               				city:newFlat.city,
                                      street:newFlat.street,
                                      house:newFlat.house,
                                      flatNumber:newFlat.flatNumber,
                               				created:newFlat.created,
                               				people:newFlat.people,
                                      square:newFlat.square,
                                      ownerId:newFlat.ownerId
                               				}
						 ,success: true
					 });
	 });

};



exports.getByOwner= (req, res, next)=>{

	if (!req.params.id){
    res.send({msg:'need for owner in request',success:false});
	} else {
		Flat.find({ownerId:req.params.id},(err, flats)=>{
			if (err) res.send({err: err, success: false});
			if(flats){
				let data=flats.map((flat)=>{
                                  {
                          				id:flat._id,
                          				flatName:flat.flatName,
                          				city:flat.city,
                                  street:flat.street,
                                  house:flat.house,
                                  flatNumber:flat.flatNumber,
                          				created:flat.created,
                          				people:flat.people,
                                  square:flat.square,
                                  ownerId:flat.ownerId
                          				}
				});
				res.send({flat: data, success: true});
			} else {
					res.send({flat: null, success: false});
				};
			});
		};
};
