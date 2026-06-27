'use strict';

const redis = require('../redis/client');
const { userKey } = require('../utils/redis-keys');
const { formatGameDate } = require('../utils/date');
const { BOX_REWARDS } = require('../constants/game');

async function openDailyBox(uid, optionId) {
  const today = formatGameDate();
  const lastClaim = await redis.get(userKey(uid, 'kutu'));

  if (lastClaim === today) {
    return { box: 'hata', box_kazanc: 'hata' };
  }

  const reward = BOX_REWARDS[optionId];
  let boxValue = 'toka';

  if (reward) {
    if (reward.special) {
      boxValue = reward.special;
    } else {
      const current = parseFloat(await redis.get(userKey(uid, reward.field))) || 0;
      boxValue = current + reward.amount;
      await redis.set(userKey(uid, reward.field), boxValue);
    }
  }

  await redis.set(userKey(uid, 'kutu'), today);

  return { box: boxValue, box_kazanc: 'hata' };
}

module.exports = { openDailyBox };
