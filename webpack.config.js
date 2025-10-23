const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
	mode: isDev ? 'development' : 'production',
	entry: path.resolve(__dirname, 'src', 'index.tsx'),
	output: {
		filename: isDev ? 'bundle.js' : 'bundle.[contenthash].js',
		path: path.resolve(__dirname, 'dist'),
		clean: true,
		publicPath: '/',
	},

	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.jsx'],
	},

	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.css$/i,
				use: [
					isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
					{ loader: 'css-loader', options: { sourceMap: isDev } },
				],
			},
			{
				test: /\.module\.s[ac]ss$/i,
				use: [
					isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							modules: {
								localIdentName: '[local]__[hash:base64:5]',
							},
							sourceMap: isDev,
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: isDev,
						},
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: isDev,
							sassOptions: {
								quietDeps: true,
								silenceDeprecations: ['legacy-js-api'],
							},
						},
					},
				],
			},
			{
				test: /\.s[ac]ss$/i,
				exclude: /\.module\.s[ac]ss$/i,
				use: [
					isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
					{ loader: 'css-loader', options: { sourceMap: isDev } },
					{ loader: 'postcss-loader', options: { sourceMap: isDev } },
					{
						loader: 'sass-loader',
						options: {
							sourceMap: isDev,
							sassOptions: {
								quietDeps: true,
								silenceDeprecations: ['legacy-js-api'],
							},
						},
					},
				],
			},
			{
				test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
			},
		],
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'public', 'index.html'),
		}),
		new MiniCssExtractPlugin({
			filename: isDev ? '[name].css' : '[name].[contenthash].css',
		}),
	],

	devtool: isDev ? 'source-map' : false,

	devServer: {
		static: path.resolve(__dirname, 'dist'),
		port: 3000,
		open: true,
		hot: true,
		historyApiFallback: true,
	},

	infrastructureLogging: {
		level: 'warn',
	},
};
