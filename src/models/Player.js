'use strict';

const shortid = require('shortid');

class Player {
  constructor() {
    this.username = '';
    this.id = shortid.generate();
    this.uid = '';
    this.uids = '';
    this.aktif = '';
    this.gold = '';
    this.avacoin = '';
    this.lvl = '';
    this.sifre = '';
    this.rpt = '';
    this.slvr = '';
    this.mgz = '';
    this.odul = '';
    this.promo_mesaj = '';
    this.box = '';
    this.box_kazanc = '';
    this.send = '';
    this.cid = null;

    // Klan
    this.clan_name = '';
    this.clan_tag = '';
    this.p_sifre = '';
    this.clan_role = '';
    this.clan_pin = '';

    // Görev
    this.duello = '';
    this.tokalas = '';
    this.tekme = '';
    this.saril = '';
  }
}

module.exports = Player;
