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
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader'],
                },
            ],
        },
    };
}

module.exports = webpackConfig;
