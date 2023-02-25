const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
const mode = process.argv.includes('production') ? 'production' : 'development';
const { ProvidePlugin, DefinePlugin } = require("webpack");
const { VueLoaderPlugin } = require('vue-loader');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const pjson = require('./package.json');
const CopyWebpackPlugin = require('copy-webpack-plugin');

/**
 * Webpack configuration
 * @type {import('webpack').Configuration}
 * @see https://webpack.js.org/configuration/
 */
module.exports = {
    devtool: mode === 'development' ? 'eval-source-map' : false,
    entry: {
        frontend: './src/frontend.ts',
        admin: './src/js/admin.ts',
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
        // Define global variables for Vue 3
        new DefinePlugin({ __VUE_OPTIONS_API__: true, __VUE_PROD_DEVTOOLS__: false }),
        // Copy images and fonts to assets folder
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'src/images',
                    to: 'images',
                    globOptions: {
                        ignore: ['**/*.gitkeep'],
                    },
                    noErrorOnMissing: true,
                },
                {
                    from: 'src/fonts',
                    to: 'fonts',
                    globOptions: {
                        ignore: ['**/*.gitkeep'],
                    },
                    noErrorOnMissing: true,
                },
            ],
        }),
        // Vue loader
        new VueLoaderPlugin(),
        // Will remove unexpected empty js file
        new RemoveEmptyScriptsPlugin(),
        // Extract CSS from commonjs into seperate file
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
        }),
        // Provide plugin globally
        new ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
        }),
        // Browser Sync
        new BrowserSyncPlugin({
            host: "localhost",
            port: 3000,
            proxy: `${pjson.name}.localhost`,
            notify: false,
            files: ['./*.php', './**/*.php', './src/**/*.*'],
            watch: true,
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
            // @fontsource fonts https://fontsource.org/docs/getting-started
            {
                test: /[\\/](fonts|@fontsource)[\\/].*\.(svg|woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: './fonts/[name][ext]',
                },
            },
            // Vue
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: { sourceMap: true },
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
    optimization: {
        splitChunks: {
            cacheGroups: {
                js: { // Separate vendors js
                    test: /[\\/]node_modules[\\/].*\.js$/,
                    name: "vendors",
                    chunks: "initial",
                },
            },
        },
        minimizer: [
            // Minimize style
            new CssMinimizerPlugin({
                minimizerOptions: {
                    preset: [
                        "default",
                        {
                            discardComments: { removeAll: true },
                        },
                    ],
                },
            }),
            // Minimize js
            new TerserPlugin({
                terserOptions: {
                    format: {
                        comments: false,
                    },
                },
                extractComments: false,
            }),
        ],
    },
    performance: {
        // Control which files type for performance hints
        assetFilter: function (assetFilename) {
            return assetFilename.endsWith('.js') || assetFilename.endsWith('.css');
        },
    },
};
