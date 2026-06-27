'use strict';

const redis = require('../redis/client');
const config = require('../config');
const { userKey, clanKey, clanMemberRoleKey } = require('../utils/redis-keys');
const { formatGameDate } = require('../utils/date');

async function findUserIdByEmail(email) {
  const uids = Number(await redis.get('uids')) || 0;
  const searchLimit = uids * 2;

  for (let i = 1; i <= searchLimit; i++) {
    const storedEmail = await redis.get(userKey(i, 'mail'));
    if (storedEmail === email) {
      return i;
    }
  }

  return 0;
}

async function syncAppearance(uid) {
  const appearanceKey = userKey(uid, 'appearance');
  const usernameKey = userKey(uid, 'app_us');
  const appearance = await redis.lrange(appearanceKey, 0, -1);

  if (appearance && appearance.length > 0) {
    await redis.set(usernameKey, appearance[0]);
  } else {
    await redis.set(usernameKey, config.defaults.username);
  }
}

async function loadClanData(player, uid) {
  const clanId = await redis.get(userKey(uid, 'clan'));

  if (!clanId) {
    player.cid = null;
    player.clan_name = config.defaults.clanName;
    return;
  }

  const role = await redis.get(clanMemberRoleKey(clanId, uid));

  if (role !== '3') {
    player.cid = null;
    player.clan_name = config.defaults.clanName;
    return;
  }

  player.cid = clanId;
  player.clan_name = await redis.get(clanKey(clanId, 'name'));
  player.clan_tag = await redis.get(clanKey(clanId, 'tag'));
  player.clan_pin = await redis.get(clanKey(clanId, 'pin'));
}

async function resolveBoxStatus(player, uid, currentDate) {
  const lastClaimDate = await redis.get(userKey(uid, 'kutu'));
  player.box_kazanc = currentDate !== lastClaimDate ? 'kazanc' : 'hata';
}

async function authenticate(email, password) {
  const uid = await findUserIdByEmail(email);

  if (!uid) {
    return null;
  }

  const storedPassword = await redis.get(userKey(uid, 'panelsifre'));

  if (storedPassword !== password) {
    return null;
  }

  return uid;
}

async function loadPlayerProfile(player, uid) {
  player.uid = uid;

  await syncAppearance(uid);

  player.username = await redis.get(userKey(uid, 'app_us'));
  player.gold = await redis.get(userKey(uid, 'gld'));

  let avacoin = await redis.get(userKey(uid, 'avacoin'));
  if (avacoin == null) {
    avacoin = config.defaults.avacoin;
    await redis.set(userKey(uid, 'avacoin'), avacoin);
  }
  player.avacoin = avacoin;

  player.lvl = await redis.get(userKey(uid, 'exp'));
  player.sifre = await redis.get(userKey(uid, 'panelsifre'));
  player.rpt = await redis.get(userKey(uid, 'rpt'));
  player.slvr = await redis.get(userKey(uid, 'slvr'));
  player.p_sifre = await redis.get(userKey(uid, 'panelsifre'));

  await loadClanData(player, uid);
  await resolveBoxStatus(player, uid, formatGameDate());

  return player;
}

async function setLevel(uid, level) {
  await redis.set(userKey(uid, 'exp'), level);
}

module.exports = {
  authenticate,
  loadPlayerProfile,
  setLevel,
  resolveBoxStatus,
};
