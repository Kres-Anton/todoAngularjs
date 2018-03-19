const $ = require('gulp-load-plugins')();
const gulp=require('gulp');

module.exports = function(options){
	
	return function(callback){
		$.express.run(['./back/server.js']);
		callback();
	};
};