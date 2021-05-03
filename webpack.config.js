const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {

    const isProd = argv.mode === 'production';
    const isDev = !isProd;

    const filename = ext => isProd ? `[name].[contenthash].bundle.${ext}` : `[name].bundle.${ext}`;

    return {
        target: "web",
        context: path.resolve(__dirname, 'src'),
        devServer: {
            hot: true,
            open: true
        },
        devtool: isDev ? "source-map" : false,
        entry: {
            main: './index.js'
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: filename('js'),
            clean: true
        },

        resolve: {
            extensions: ['.js'],
            alias: {
                '@': path.resolve(__dirname, 'src'),
                '@core': path.resolve(__dirname, 'src', 'core'),
            }
        },
        plugins: [
            new FaviconsWebpackPlugin('./favicon.png'),
            new HtmlWebpackPlugin({
                template: './index.html'
            }),

            new MiniCssExtractPlugin({
                filename: filename('css'),
            })
        ],
        module: {
            rules: [
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        "sass-loader",
                    ],
                },
                {
                    test: /\.m?js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                }
            ],
        },
    };
};
