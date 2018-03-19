let mongoose = require('mongoose');
let config =require('../config/index');
let connection = mongoose.connect(config.get('mongoose:uri'),config.get('mongoose:options'));
let db =mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

module.exports=mongoose;
