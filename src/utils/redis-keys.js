'use strict';

const userKey = (uid, field) => `uid:${uid}:${field}`;
const clanKey = (cid, field) => `clans:${cid}:${field}`;
const clanMemberRoleKey = (cid, uid) => `clans:${cid}:m:${uid}:role`;
const promoClaimKey = (uid, index) => `uid:${uid}:promo:${index}`;
const promoFieldKey = (index, field) => `promo:${index}:${field}`;

module.exports = {
  userKey,
  clanKey,
  clanMemberRoleKey,
  promoClaimKey,
  promoFieldKey,
};
