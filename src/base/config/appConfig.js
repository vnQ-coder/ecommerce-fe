const { webpackConfigs } = require('./webpackConfig');

const isProductionEnv = process.env.NODE_ENV === 'production';

const appConfigs = {
  host: webpackConfigs.host,
  port: webpackConfigs.port,
  locale: isProductionEnv ? 'tr' : 'en',
  bkUrl: isProductionEnv ? 'https://api.saglikcafeshop.com' : 'http://127.0.0.1:4321',
  bkApiUrl: isProductionEnv ? 'https://api.saglikcafeshop.com/api' : 'http://127.0.0.1:4321/api',
  bkPublicDir: isProductionEnv ? 'https://api.saglikcafeshop.com/assets/public' : 'http://127.0.0.1:4321/assets/public',
};
export default appConfigs;
