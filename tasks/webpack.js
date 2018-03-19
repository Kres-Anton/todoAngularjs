const $ = require('gulp-load-plugins')();
const gulp=require('gulp');
const webpackStream = require('webpack-stream');
const webpack = webpackStream.webpack;
const logger = require('gulplog');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const NODE_ENV=process.env.NODE_ENV || 'development';
const named = require('vinyl-named')
let isProduction = NODE_ENV!=='development';
let config = {};
config.plugins =[];


config.plugins.push(
    new webpack.NoEmitOnErrorsPlugin(),
  	new webpack.DefinePlugin({
    		NODE_ENV:JSON.stringify(NODE_ENV)
    		})
    );

if (isProduction){
	config.plugins.push(new UglifyJSPlugin());
}


module.exports = function (options,callback) {
	return function(callback){
		
		function done(err,stats){
			firstBuildReady = true;
			
			if (err){
				return;
			}
			
			logger[stats.hasErrors() ? 'error' : 'info'](stats.toString({
				colors:true
			}));
		}
	
let options = {
   output:{
       publicPath: '/js/',
   },
   
  watch: !isProduction,
    
  watchOptions : {
    	aggregateTimeout : 100
    },
    
   devtool: isProduction ? false : 'cheap-inline-module-source-map',
   
   resolve: {
    extensions: ['.js'],
      modules: [path.resolve(__dirname, "src"), "node_modules"]
  },
   module:{
       rules:[   
             {
               test: /\.js$/,
               exclude: [/node_modules/,/\.spec\.js$/],
               use: [
                 {
                   loader: 'babel-loader',
                  }
               ]
            },
            {
        		test: /\.(woff|woff2|ttf|eot|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        		loader: 'file-loader', options:{
        			name:'../fonts/[name].[ext]'
        		}
      		}
       ]
   },
   plugins: config.plugins
};	

  if (!isProduction) {
    // tslint support
    options.module.rules.push({
      test: /\.js$/,
      enforce: 'pre',
      loader: 'tslint-loader'
    });
  }

	return gulp.src('./front/src/*.js')
		.pipe($.plumber({
			errorHendler:$.notify.onError(err =>({
				title:'webpack',
				message:err.message
			}))
		}))
    .pipe(named())
		.pipe(webpackStream(options,null,done))
		.pipe(gulp.dest('./public/js'))
		.on('data',function(){
			if(firstBuildReady){
				callback();
			}
		});

};
};