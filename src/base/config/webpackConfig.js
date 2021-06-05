const isProductionEnv = process.env.NODE_ENV === 'production';

exports.webpackConfigs = {
  host: isProductionEnv ? '0.0.0.0' : '127.0.0.1',
  port: '5321',
};
