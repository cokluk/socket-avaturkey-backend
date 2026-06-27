'use strict';

const redis = require('../redis/client');
const { userKey } = require('../utils/redis-keys');
const { SHOP_PRODUCTS } = require('../constants/game');
const { getDateParts } = require('../utils/date');

async function applyPlusPackage(uid, packageId) {
  const { month } = getDateParts();
  let nextMonth = parseFloat(month);

  if (nextMonth === 12) {
    nextMonth = 1;
  } else {
    nextMonth += 1;
  }

  await redis.set(userKey(uid, 'plus'), '1');
  await redis.set(userKey(uid, 'plus_paket'), String(packageId));
  await redis.set(userKey(uid, 'plus_bitis'), nextMonth);
}

async function applyProductEffect(uid, effect) {
  switch (effect) {
    case 'plusPackage1':
      await applyPlusPackage(uid, 1);
      break;
    case 'plusPackage2':
      await applyPlusPackage(uid, 2);
      break;
    case 'plusPackage3':
      await applyPlusPackage(uid, 3);
      break;
    case 'addRonfor': {
      const current = parseFloat(await redis.get(userKey(uid, 'ronfor'))) || 0;
      await redis.set(userKey(uid, 'ronfor'), current + 500000);
      break;
    }
    case 'addCrt': {
      const current = parseFloat(await redis.get(userKey(uid, 'crt'))) || 0;
      await redis.set(userKey(uid, 'crt'), current + 100000);
      break;
    }
    case 'addAct': {
      const current = parseFloat(await redis.get(userKey(uid, 'act'))) || 0;
      await redis.set(userKey(uid, 'act'), current + 100000);
      break;
    }
    default:
      break;
  }
}

async function purchaseProduct(uid, productId) {
  const product = SHOP_PRODUCTS[productId] || SHOP_PRODUCTS['1'];
  const coin = parseFloat(await redis.get(userKey(uid, 'avacoin'))) || 0;

  if (coin <= product.price) {
    return { success: false, productId: 'hata' };
  }

  await redis.set(userKey(uid, 'avacoin'), coin - product.price);

  if (product.apply) {
    await applyProductEffect(uid, product.apply);
  }

  const updatedCoin = await redis.get(userKey(uid, 'avacoin'));

  return {
    success: true,
    productId,
    avacoin: updatedCoin,
  };
}

module.exports = { purchaseProduct };
