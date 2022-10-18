const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('@effortlessmotion/html-webpack-inline-source-plugin');

module.exports = {
	entry: __dirname + '/src/main.js',
	output: {
		path: __dirname + '/dist',
		filename: 'index_bundle.js',
		publicPath: ''
	},
	plugins: [new HtmlWebpackPlugin({ inlineSource: '.js$', inject: 'body' }), new HtmlWebpackInlineSourcePlugin()],
	devServer: {
		port: 3000,
		hot: true
	}
};
