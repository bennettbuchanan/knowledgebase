function webpackConfig() {
    return {
        entry: [
            './index.jsx',
        ],
        output: {
            filename: './bundle.js',
        },
        module: {
            rules: [
                {
                    test: /.jsx$/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                cacheDirectory: true,
                            },
                        },
                    ],
                },
                {
                    test: /.css$/,
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                cacheDirectory: true,
                            },
                        },
                    ],
                },
            ],
        },
    };
}

module.exports = webpackConfig;
