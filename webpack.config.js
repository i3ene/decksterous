module.exports = {
  module: {
    rules: [
      {
        test: /\.shader\.[a-zA-Z]+$/,
        use: "raw-loader",
      },
    ],
  },
};
