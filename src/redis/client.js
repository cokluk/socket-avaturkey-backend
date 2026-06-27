'use strict';

const redis = require('redis');
const asyncRedis = require('async-redis');
const config = require('../config');

const client = asyncRedis.createClient({
  host: config.redis.host,
  port: config.redis.port,
});

client.on('error', (err) => {
  console.error('[Redis] Bağlantı hatası:', err.message);
});

module.exports = client;
