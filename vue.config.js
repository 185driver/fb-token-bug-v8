module.exports = {
  pwa: {
    workboxOptions: {
      cleanupOutdatedCaches: true,
      clientsClaim: true,
      skipWaiting: true,
    },
  },
  productionSourceMap: false,
};
