module.exports = {
  resolve: {
    extensions: ['.ts', '.js']
  },
  entry: './electron/main.ts',
  module: {
    rules: require('./rules.webpack'),
  },
  devServer: {
    // contentBase: path.join(__dirname, 'dist'),
    // compress: true,
    port: 12347,
    // loggerPort: 12346
  }
}