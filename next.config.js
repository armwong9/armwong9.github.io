module.exports = {
    images: {
        unoptimized: true
      },
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.resolve.fallback.fs = false;
      }
      config.module.rules.push({
        test: /\.md|\.mdx$/,
        use: "raw-loader",
      });
  
      return config;
    },
  };
