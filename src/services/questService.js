'use strict';

const redis = require('../redis/client');
const { userKey } = require('../utils/redis-keys');
const { QUEST_THRESHOLDS } = require('../constants/game');

async function getCounter(uid, field) {
  const value = await redis.get(userKey(uid, field));
  return value == null ? 0 : Number(value);
}

async function completeQuestIfReady(uid, field, config) {
  let progress = await getCounter(uid, field);

  if (progress < config.limit) {
    return progress;
  }

  const coin = parseFloat(await redis.get(userKey(uid, 'avacoin'))) || 0;
  await redis.set(userKey(uid, 'avacoin'), coin + config.reward);
  await redis.set(userKey(uid, field), 0);

  return 0;
}

async function processQuests(uid) {
  const stats = {};

  for (const [field, config] of Object.entries(QUEST_THRESHOLDS)) {
    stats[field] = await completeQuestIfReady(uid, field, config);
  }

  return stats;
}

module.exports = { processQuests };
