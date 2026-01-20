module.exports = function override(config, env) {
  // Add fallbacks for node modules
  config.resolve.fallback = {
    ...config.resolve.fallback,
    "fs": false,
    "zlib": require.resolve("browserify-zlib"),
    "http": require.resolve("stream-http"),
    "https": require.resolve("https-browserify"),
    "url": require.resolve("url/"),
    "path": false,
    "stream": false,
    "crypto": false,
    "util": false,
    "assert": false
  };
  
  // Fix localStorage issue during build
  if (env === 'production') {
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    config.plugins.forEach(plugin => {
      if (plugin instanceof HtmlWebpackPlugin) {
        plugin.userOptions.scriptLoading = 'defer';
        plugin.userOptions.inject = 'body';
      }
    });
  }
  
  return config;
} 