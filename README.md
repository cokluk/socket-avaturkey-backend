# Avaturkey Game Server

Avaturkey game server powered by Socket.IO and Redis.

## Requirements

- Node.js 14+
- Redis 3.x+

## Installation

```bash
npm install
```

## Running

```bash
npm start
npm run dev
```

Default port: **8443** — override with the `PORT` environment variable.

Use `REDIS_HOST` and `REDIS_PORT` to configure the Redis connection.

## Project Structure

```
src/
├── config.js              # Server and Redis configuration
├── server.js              # Socket.IO server bootstrap
├── constants/game.js      # Game constants (shop, quests, boxes)
├── handlers/              # Socket event handlers
├── models/Player.js       # Player model
├── redis/client.js        # Redis client
├── services/              # Business logic layer
└── utils/                 # Helper functions
```

## Socket Events

| Event | Description |
|-------|-------------|
| `spawn` | Player data after connection |
| `bilgi` | Login / profile load |
| `magaza` | Shop purchase |
| `odul` | Reward claim |
| `AC.GNDR` | Avacoin transfer |
| `promo` | Promo code |
| `kutu` | Daily box |
| `itibar` | Reputation update |
| `hesap` | Account / clan edit |
| `gorev` | Quest progress |
| `set_bilgi` | Level update |
