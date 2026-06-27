'use strict';

const SHOP_PRODUCTS = {
  '1': { price: 350, apply: null },
  '2': { price: 350, apply: null },
  '3': { price: 5000, apply: 'plusPackage1' },
  '4': { price: 350, apply: 'addCrt' },
  '5': { price: 350, apply: 'addRonfor' },
  '6': { price: 350, apply: 'addAct' },
  '7': { price: 15000, apply: 'plusPackage2' },
  '8': { price: 20000, apply: 'plusPackage3' },
};

const REWARD_AMOUNTS = {
  '1': 60,
  '2': 30,
};

const QUEST_THRESHOLDS = {
  duello: { limit: 10, reward: 150 },
  tokalas: { limit: 200, reward: 250 },
  tekme: { limit: 200, reward: 250 },
  saril: { limit: 200, reward: 250 },
};

const BOX_REWARDS = {
  '0': { field: 'avacoin', amount: 50 },
  '2': { field: 'crt', amount: 100000 },
  '3': { field: 'ronfor', amount: 500000 },
  '4': { field: 'act', amount: 10000 },
  '5': { field: 'act', amount: 10000 },
  '6': { special: 'toka' },
  '7': { field: 'snowscore', amount: 1000 },
};

module.exports = {
  SHOP_PRODUCTS,
  REWARD_AMOUNTS,
  QUEST_THRESHOLDS,
  BOX_REWARDS,
};
