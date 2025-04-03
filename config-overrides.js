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
  
  return config;
} 