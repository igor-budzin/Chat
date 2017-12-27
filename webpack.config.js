const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const outputPath = path.resolve(__dirname, './dist');

const webpackConfig = {
	entry: {
		app: [
			path.resolve(__dirname, './client/src/index.js'),
			'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000'
		]
	},
	output: {
		path: outputPath,
		filename: '[name].js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: [
					'style-loader',
					'css-loader',
					'sass-loader'
				]
			},
			{
				test: /\.(gif|png|jpg|jpeg|svg)$/,
				exclude: /node_modules/,
				include: path.resolve(__dirname, './client/src/assets/img/'),
				use: 'url-loader?limit=10000&name=assets/img/[name]-[hash].[ext]'
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, './client/src/assets/index.html'),
			filename: 'index.html',
			path: outputPath
		}),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin()
	],
	devServer: {
		contentBase: path.resolve(__dirname, './client/dist'),
		port: 8080,
		historyApiFallback: true,
		inline: true,
		hot: true
	}
}

module.exports = webpackConfig;
