var HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: "./src/index.js",
  plugins: [new HtmlWebpackPlugin({
    template: "template.html"
  })],
  module: {
    rules: [
      { 
        test: /\.scss$/,
        //the order matters
        use: [
            "style-loader",//3. Inject styles into DOM
            "css-loader",  // 2. Turns css into common JS
            "sass-loader"  // 1. Turns sass into css
        ] 
      }
    ]
  }
};