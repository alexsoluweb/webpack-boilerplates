const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
const { ProvidePlugin } = require("webpack");
const mode = process.argv.includes('production') ? 'production' : 'development';

module.exports = {
    devtool: mode === 'development' ? 'source-map' : false,
    entry: {
        main: './src/js/main.js',  
        style: './src/sass/main.scss',
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'assets'),
        // Clean build
        clean: {
            keep: /(media)/, // Keep these assets
        },
    },
    plugins: [
        // Remove empty scripts for style entry
        new RemoveEmptyScriptsPlugin(),
        // Extract CSS from commonjs into seperate file
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
        }),
        // Provide Global Library
        new ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.$': 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default'],
        }),
    ],
    module: {
      rules: [
        {
          test: /\.s?css$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        },
      ],
    },
};