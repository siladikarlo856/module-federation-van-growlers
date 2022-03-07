const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");

module.exports = {
  output: {
    publicPath: "http://localhost:8082/",
  },

  resolve: {
    extensions: [".tsx", ".ts", ".vue", ".jsx", ".js", ".json"],
  },

  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    port: 8082,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "vanGrowlers",
      filename: "remoteEntry.js",
      remotes: {
        growlers: "growlers@http://localhost:8080/remoteEntry.js",
      },
      exposes: {},
      shared: require("./package.json").dependencies,
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
};
