'use strict';

const redis = require('../redis/client');
const { userKey } = require('../utils/redis-keys');
const { REWARD_AMOUNTS } = require('../constants/game');

async function claimReward(uid, tip) {
  const amount = REWARD_AMOUNTS[tip];

  if (!amount) {
    return { odul: null, avacoin: await redis.get(userKey(uid, 'avacoin')) };
  }

  const coin = parseFloat(await redis.get(userKey(uid, 'avacoin'))) || 0;
  const updated = coin + amount;

  await redis.set(userKey(uid, 'avacoin'), updated);

  return { odul: tip, avacoin: updated };
}

module.exports = { claimReward };
