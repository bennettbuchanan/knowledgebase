module.exports = {
    entry: [
        './index.jsx',
    ],
    output: {
        filename: './bundle.js',
    },
    module: {
        rules: [
            {
                test: /.jsx?$/, // Match both JS and JSX files.
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015', 'react', 'stage-1'],
                            cacheDirectory: true,
                        },
                    },
                ],
            },
            {
                test: /\.png$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
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
