const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
const mode = process.argv.includes('production') ? 'production' : 'development';
const { ProvidePlugin } = require("webpack");
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
        frontend: './src/js/frontend.js',
        admin: './src/js/admin.js',
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'assets'),
        clean: true,
    },
    resolve: {
    },
    plugins: [
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
        // Remove empty scripts for style entry
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
            // Style
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
        ],
    },
};
