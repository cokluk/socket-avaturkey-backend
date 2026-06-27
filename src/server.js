'use strict';

const socketIo = require('socket.io');
const config = require('./config');
const { registerSocketHandlers } = require('./handlers/socketHandlers');

function createServer() {
  const io = socketIo(config.port);

  registerSocketHandlers(io);

  console.log(`[Server] Avaturkey sunucusu ${config.port} portunda dinliyor`);

  return io;
}

module.exports = { createServer };
