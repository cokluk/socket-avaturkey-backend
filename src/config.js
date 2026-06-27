'use strict';

module.exports = {
  port: Number(process.env.PORT) || 8443,
  redis: {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: Number(process.env.REDIS_PORT) || 6379,
  },
  defaults: {
    username: 'Avaturkey',
    avacoin: 30,
    clanName: 'YOK',
  },
};
