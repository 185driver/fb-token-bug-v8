module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/fb-token-bug-v8/'
    : '/',
  pwa: {
    workboxOptions: {
      cleanupOutdatedCaches: true,
      clientsClaim: true,
      skipWaiting: true,
    },
  },
  productionSourceMap: false,
};
