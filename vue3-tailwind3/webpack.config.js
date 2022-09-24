const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
const mode = process.argv.includes('production') ? 'production' : 'development';
const { ProvidePlugin, DefinePlugin } = require("webpack");
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
    devtool: mode === 'development' ? 'eval-source-map' : false,
    entry: {
        frontend: './src/main.js',
        style: './src/sass/style.scss',
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'assets'),
        clean: true,
    },
    resolve: {
        alias: { vue: "vue/dist/vue.esm-bundler.js" }
    },
    plugins: [
        new DefinePlugin({ __VUE_OPTIONS_API__: true, __VUE_PROD_DEVTOOLS__: true }), 
        // Vue loader
        new VueLoaderPlugin(),
        // Remove empty scripts for style entry
        new RemoveEmptyScriptsPlugin(),
        // Extract CSS from commonjs into seperate file
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
        }),
        // Provide jQuery globally
        new ProvidePlugin({
            $: "jquery",
            "global.$": "jquery",
            "window.$": "jquery",
        }),
    ],
    externals: {
        jquery: 'jQuery',
    },
    module: {
        rules: [
            // Styles
            {
                test: /\.s?css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    "resolve-url-loader",
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        }
                    }
                ],
            },
            // Fonts
            {
                test: /\.(eot|ttf|woff|woff2)$/i,
                type: 'asset/resource',
                generator: {
                    filename: './fonts/[name][ext]',
                },
            },
            // Images
            {
                test: /\.(svg|png|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: './images/[name][ext]',
                },
            },
            // Vue
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ],
    },
};