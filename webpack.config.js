const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: process.env.NODE_ENV || 'development',
	entry: path.resolve(__dirname, 'src', 'index.tsx'),
	output: {
		filename: 'bundle.[contenthash].js',
		path: path.resolve(__dirname, 'dist'),
		clean: true,
		publicPath: '/',
	},

	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.jsx'],
	},

	module: {
		rules: [
			// ---------- TypeScript ----------
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},

			// ---------- Plain CSS (e.g., Swiper) ----------
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},

			// ---------- SCSS Modules ----------
			{
				test: /\.module\.s[ac]ss$/i,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: {
								localIdentName: '[local]__[hash:base64:5]',
							},
							sourceMap: true,
						},
					},
					'postcss-loader',
					{
						loader: 'sass-loader',
						options: {
							implementation: require('sass'),
							api: 'modern', // ✅ Use modern JS API (no warnings)
							sassOptions: { quietDeps: true },
						},
					},
				],
			},

			// ---------- Global SCSS ----------
			{
				test: /\.s[ac]ss$/i,
				exclude: /\.module\.s[ac]ss$/i,
				use: [
					'style-loader',
					'css-loader',
					'postcss-loader',
					{
						loader: 'sass-loader',
						options: {
							implementation: require('sass'),
							api: 'modern', // ✅ Use modern JS API (no warnings)
							sassOptions: { quietDeps: true },
						},
					},
				],
			},

			// ---------- Images ----------
			{
				test: /\.(png|jpg|jpeg|gif|svg)$/i,
				type: 'asset/resource',
			},

			// ---------- Fonts ----------
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
			},
		],
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'public', 'index.html'),
		}),
	],

	devtool: 'source-map',

	devServer: {
		static: path.resolve(__dirname, 'dist'),
		port: 3000,
		open: true,
		hot: true,
		historyApiFallback: true,
	},

	infrastructureLogging: {
		level: 'warn', // suppress noisy deprecation chatter
	},
};
