const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { HotModuleReplacementPlugin } = require('webpack')

module.exports = {
    entry: path.join(__dirname, "src", "index.js"),
    output: {
        path: path.join(__dirname, "build"),
        filename: "index.bundle.js",
        clean: true
    },
    mode: process.env.NODE_ENV || "development",
    resolve: {
        modules: [path.resolve(__dirname, "src"), "node_modules"],
        extensions: [".js", ".jsx", ".scss"],
    },
    devServer: {
        contentBase: path.join(__dirname, "src"),
        hot: true,
        historyApiFallback: true,
        proxy: [{
            context: ["/api"],
            target: "http://localhost:4000"
        }]
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.s[ac]ss$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src", "index.html"),
        }),
        new HotModuleReplacementPlugin(),
    ],
}