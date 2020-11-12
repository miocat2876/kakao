module.exports = {
    entry: [
        "./src/index.js"
    ],

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                        plugins: ["@babel/plugin-proposal-class-properties"]
                    }
                }
            },
            // {
            //     test: /\.(html)$/,
            //     use: [
            //         {
            //             loader: "html-loader",
            //             options: {minimize: true}
            //         }
            //     ]
            // },
            {
                test: /\.(css)$/,
                exclude: /node_modules/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },

    resolve: {
        extensions: ["*", ".js", "jsx"]
    },

    output: {
        path: __dirname + "/dist",
        publicPath: "/",
        filename: "bundle.js"
    },

    devServer: {
        contentBase: "./dist",
        port: 3000,
        historyApiFallback: true
    }
}