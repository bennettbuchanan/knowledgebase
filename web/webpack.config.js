function webpackConfig() {
    return {
        entry: './index.js',
        output: {
            filename: './bundle.js',
        },
        module: {
            rules: [
                {
                    test: /.js$/,
                    use: [
                        {
                            loader: 'babel-loader',
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
