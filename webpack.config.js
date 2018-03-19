onst webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const autoprefixer = require('autoprefixer');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const NODE_ENV=process.env.NODE_ENV || 'development';
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



module.exports = {
    entry: {
        'app': '../front/src/app/app.js',
      },
   output:{
   	   path: path.resolve(__dirname, 'public'),
       publicPath: '/',
       filename: isProduction? "[name].[hash].js" : "[name].js"
   },
   
  watch: !isProduction,
    
  watchOptions : {
    	aggregateTimeout : 100
    },
    
   devtool: isProduction ? false : 'cheap-inline-module-source-map',
   
   resolve: {
    extensions: ['.js']
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
        			   name:'./fonts/[name].[ext]'
        		}
      		}
       ]
   },
   plugins: config.plugins
};