var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var glob = require("glob");

module.exports = [{
	entry:{
		"app":"./src/app.ts",
		 vendor: ["knockout","object-assign","redux"]
	},
	output: {
		path: __dirname + "/dist",
		filename: "[name].js"
	},
	module: {
		loaders: [
			// note that babel-loader is configured to run after ts-loader
			{ 
				test: /\.ts(x?)$/, 
				loader: "babel-loader?presets[]=es2015!ts-loader",
				exclude:"node_modules" 
			}
		]
	},
	resolve: {
		extensions: ["", ".webpack.js", ".web.js", ".ts", ".js"]
	},
	plugins: [
    	new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js"),
		new HtmlWebpackPlugin({
			title:"Knockout and Redux",
			template:"./src/index.html"
		})
  	]
},
{
	entry:glob.sync("./tests/**/*.ts"),
	output: {
		path: __dirname + "/tests",
		filename: "tests.js"
	},
	module: {
		loaders: [
			// note that babel-loader is configured to run after ts-loader
			{ 
				test: /\.ts(x?)$/, 
				loader: "babel-loader?presets[]=es2015!ts-loader",
				exclude:"node_modules" 
			}
		]
	},
	resolve: {
		extensions: ["", ".webpack.js", ".web.js", ".ts", ".js"]
	}
}]