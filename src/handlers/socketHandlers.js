'use strict';

const redis = require('../redis/client');
const Player = require('../models/Player');
const authService = require('../services/authService');
const shopService = require('../services/shopService');
const rewardService = require('../services/rewardService');
const transferService = require('../services/transferService');
const promoService = require('../services/promoService');
const boxService = require('../services/boxService');
const accountService = require('../services/accountService');
const questService = require('../services/questService');

function registerSocketHandlers(io) {
  io.on('connection', async (socket) => {
    const player = new Player();

    player.uids = await redis.get('uids');
    player.aktif = await redis.smembers('online_tr');

    socket.emit('spawn', player);
    console.log('[Socket] Yeni bağlantı:', player.id);

    socket.on('set_bilgi', async (data) => {
      const { lvl, id } = data;

      await authService.setLevel(id, lvl);
      player.lvl = lvl;

      socket.emit('set_bilgi', player);
    });

    socket.on('bilgi', async (data) => {
      const { email, password } = data;
      const uid = await authService.authenticate(email, password);

      if (uid) {
        await authService.loadPlayerProfile(player, uid);
      }

      socket.emit('bilgi', player);
    });

    socket.on('magaza', async (data) => {
      const result = await shopService.purchaseProduct(player.uid, data.id);

      player.mgz = result.success ? result.productId : 'hata';
      player.avacoin = result.avacoin ?? (await redis.get(`uid:${player.uid}:avacoin`));

      socket.emit('magaza', player);
    });

    socket.on('odul', async (data) => {
      const result = await rewardService.claimReward(player.uid, data.tip);

      player.odul = result.odul;
      player.avacoin = result.avacoin;

      socket.emit('odul', player);
    });

    socket.on('AC.GNDR', async (data) => {
      player.send = await transferService.transferAvacoin(
        player.uid,
        parseFloat(data.gonderilen),
        data.miktar,
      );

      socket.emit('AC.GNDR', player);
    });

    socket.on('promo', async () => {
      const result = await promoService.redeemPromo(player.uid);
      Object.assign(player, result);

      socket.emit('promo', player);
    });

    socket.on('kutu', async (data) => {
      const result = await boxService.openDailyBox(player.uid, data.oid);

      player.box = result.box;
      player.box_kazanc = result.box_kazanc;

      socket.emit('kutu', player);
    });

    socket.on('itibar', async (data) => {
      const result = await accountService.updateReputation(player.uid, data.puan);

      if (result.send) {
        player.send = result.send;
      } else {
        player.rpt = result.rpt;
      }

      socket.emit('itibar', player);
    });

    socket.on('hesap', async (data) => {
      await accountService.updateAccount(player, data);
      socket.emit('hesap', player);
    });

    socket.on('gorev', async () => {
      const stats = await questService.processQuests(player.uid);

      player.duello = stats.duello;
      player.tokalas = stats.tokalas;
      player.tekme = stats.tekme;
      player.saril = stats.saril;

      socket.emit('gorev', player);
    });

    socket.on('disconnect', () => {
      console.log('[Socket] Bağlantı kapandı:', player.id);
      socket.broadcast.emit('disconnected', player);
    });
  });
}

module.exports = { registerSocketHandlers };
