const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { ModuleFederationPlugin } = webpack.container;
const deps = require('./package.json').dependencies;

module.exports = (env, argv) => {
	const isProduction = argv.mode === 'production';
	console.log({ isProduction });
	return {
		entry: './src/index',
		ignoreWarnings: [(_) => true, (_, __) => true],
		mode: process.env.NODE_ENV || 'development',
		devServer: {
			port: 3000,
			open: true,
		},
		resolve: {
			extensions: ['.ts', '.tsx', '.js'],
		},
		module: {
			rules: [
				{
					test: /bootstrap\.js$/,
					loader: 'bundle-loader',
					options: {
						lazy: true,
					},
				},
				{
					test: /\.(js|jsx|tsx|ts)$/,
					loader: 'ts-loader',
					exclude: /node_modules/,
				},
			],
		},

		plugins: [
			// new webpack.EnvironmentPlugin({ BUILD_DATE: buildDate }),
			new webpack.DefinePlugin({
				'process.env': JSON.stringify(process.env),
			}),
			new ModuleFederationPlugin({
				name: 'container',
				remotes: {
					cats: 'cats@http://localhost:3001/remoteEntry.js',
					blog: 'blog@http://localhost:3002/remoteEntry.js',
				},
				shared: ['react', 'react-dom'],
			}),
			new HtmlWebpackPlugin({
				template: './public/index.html',
			}),
		],
	};
};
