const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
const mode = process.argv.includes('production') ? 'production' : 'development';
const { ProvidePlugin, DefinePlugin } = require("webpack");
const { VueLoaderPlugin } = require('vue-loader');
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
var pjson = require('./package.json');

module.exports = {
    devtool: mode === 'development' ? 'source-map' : false,
    entry: {
        frontend: './src/main.ts',
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'assets'),
        clean: true,
    },
    resolve: {
        alias: {
            vue: "vue/dist/vue.esm-bundler.js",
        },
        extensions: [".js", ".ts", ".vue"],
    },
    plugins: [
        new DefinePlugin({ __VUE_OPTIONS_API__: false, __VUE_PROD_DEVTOOLS__: false }),
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
        // Browser Sync
        new BrowserSyncPlugin({
            host: "localhost",
            port: 3000,
            proxy: `${pjson.name}.localhost`,
            notify: false,
            files: ["./(**/)?.(php|js|vue|ts)"],
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
            },
            // Typescript
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                }
            },
        ],
    },
    // Load Vendors module into separate file
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/].*\.js$/,
                    name: "vendors",
                    chunks: "initial",
                },
            },
        },
    },
};