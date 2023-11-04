const path = require("path");

module.exports = {
  mode: "production",
  entry: "./index.ts",

  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "src"),
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
};
