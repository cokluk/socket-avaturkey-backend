'use strict';

const redis = require('../redis/client');
const { userKey, clanKey, clanMemberRoleKey } = require('../utils/redis-keys');

async function updateReputation(uid, puan) {
  if (puan == null) {
    return { send: 'hata', rpt: null };
  }

  await redis.set(userKey(uid, 'rpt'), puan);
  return { send: null, rpt: puan };
}

async function updateAccount(player, { cad, ctag, nik }) {
  player.clan_tag = cad;
  player.clan_tag = ctag;
  player.username = nik;

  const clanId = await redis.get(userKey(player.uid, 'clan'));
  const role = await redis.get(clanMemberRoleKey(clanId, player.uid));

  if (role === '3' && player.cid) {
    await redis.set(clanKey(player.cid, 'name'), cad);
    await redis.set(clanKey(player.cid, 'tag'), ctag);
  }

  return player;
}

module.exports = { updateReputation, updateAccount };
