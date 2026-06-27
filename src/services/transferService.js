'use strict';

const redis = require('../redis/client');
const { userKey } = require('../utils/redis-keys');

async function transferAvacoin(fromUid, toUid, amount) {
  const totalUsers = parseFloat(await redis.get('uids')) || 0;
  const transferAmount = parseFloat(amount);
  const senderBalance = parseFloat(await redis.get(userKey(fromUid, 'avacoin'))) || 0;

  if (senderBalance < transferAmount) {
    return 'AC.BSRZ';
  }

  if (toUid >= totalUsers) {
    return 'AC.BSRZ';
  }

  const receiverBalance = parseFloat(await redis.get(userKey(toUid, 'avacoin'))) || 0;

  await redis.set(userKey(toUid, 'avacoin'), receiverBalance + transferAmount);
  await redis.set(userKey(fromUid, 'avacoin'), senderBalance - transferAmount);
  await redis.sadd(
    userKey(fromUid, 'ac_transfer'),
    `Transfer eden -> ${fromUid} Transfer edilen -> ${toUid} Miktar ->${amount}`,
  );

  return 'AC.BSRL';
}

module.exports = { transferAvacoin };
