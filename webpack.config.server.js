const path = require('path');

module.export = {
    // entry: path.join(__dirname, 'server.js'),
    context: path.resolve(process.cwd(), 'src'),
    entry: './server.js',
    output: {
        filename: "hello.js",
        path: path.resolve(__dirname, "dist")
    }
};
