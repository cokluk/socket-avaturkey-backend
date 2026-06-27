'use strict';

const redis = require('../redis/client');
const { promoClaimKey, promoFieldKey } = require('../utils/redis-keys');

async function redeemPromo(uid) {
  const offers = await redis.smembers('offer');

  for (let i = 0; i < offers.length; i++) {
    const index = i + 1;
    const alreadyClaimed = await redis.get(promoClaimKey(uid, index));

    if (alreadyClaimed === '1') {
      return { promo_mesaj: 'hata' };
    }

    if (alreadyClaimed == null) {
      await redis.set(promoClaimKey(uid, index), '1');

      const message = await redis.get(promoFieldKey(index, 'mesaj'));
      const tip = await redis.get(promoFieldKey(index, 'tip'));
      const miktar = await redis.get(promoFieldKey(index, 'miktar'));

      const current = parseFloat(await redis.get(`uid:${uid}:${tip}`)) || 0;
      await redis.set(`uid:${uid}:${tip}`, current + Number(miktar));

      return { promo_mesaj: message };
    }
  }

  return { promo_mesaj: 'hata' };
}

module.exports = { redeemPromo };
