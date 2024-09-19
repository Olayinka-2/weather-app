const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
   mode: "development",
   entry: {
      bundle: path.resolve(__dirname, 'src/index.js'),
   },
   output: {
      filename: '[name][contenthash].js',
      path: path.resolve(__dirname, "dist"),
      clean: true,
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: "./src/template.html",
         title: 'Weather App',
      }),
   ],
   module: {
      rules: [
         {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
         }, 
         {
            test: /\.(png\svg\jpg\jpeg\gif)$/i,
            type: "asset/resource",
         }
      ]
   }
}