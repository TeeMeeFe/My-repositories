const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode : "development",
    entry : "./src/index.js",
    output : {
        filename : "main.js",
        path : path.resolve(__dirname, "dist"),
        clean : true,
    },
    devtool : "eval-source-map",
    devserver : {
        watchFiles : ["./src/template.html"],
    },
    plugins : [
        new htmlWebpackPlugin({
            template : "./src/template.html",
        }),
    ],
    module : {
        rules : [
        {
            test : /\.css$/i,
            use : ["style-loader", "css-loader"],
        },
        {
            test : /\.html$/i,
            loader : "html-loader",
        },
        {
            test : /\.(png|svg|gif|jpg|jpeg)$/i,
            type : "asset/resource",
        },
        ],
    },
};