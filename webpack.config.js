const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const env = dotenv.config({
    path: "./.env-react",
}).parsed;


const fs = require('fs')
const screens = fs.readdirSync('./src/screens')
const entries = {};

screens.forEach((screen) => {
    entries[screen.name] = `./src/screens/${screen}`
})


module.exports = function (webpackEnv, { mode }) {

    return {
        entry: './src/GetLocalsFrontend.jsx',
        output: {
            path: path.join(__dirname, 'dist'),
            filename: "[name].bundle.js",
            publicPath: '/'
        },
        devServer: {
            historyApiFallback: true,
        },
        plugins: [
            new HTMLWebpackPlugin({
                template: './src/GetLocalsFrontend.html',
                favicon: './src/favicon.ico'
            }),
            new webpack.DefinePlugin({
                "process.env": {
                    BASE_API_URL: JSON.stringify(env.BASE_API_URL),
                    WS_URL: JSON.stringify(env.WS_URL),
                    NODE_ENV: mode === "production"?
                        JSON.stringify("production"):
                        JSON.stringify("development")
                }
            })
        ],
        module: {
            rules: [
                {
                    test: /.(js|jsx|ts|tsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react']
                        }
                    }

                },
                {
                    test: /\.css$/,
                    use: [mode === 'production'? MiniCssExtractPlugin  : 'style-loader', 'css-loader'],
                },
                {
                    test: /\.(png|jpg)$/,
                    type: "asset",
                }
            ]
        },
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx']
        }
    }

}