# Avaturkey Oyun Sunucusu

Socket.IO ve Redis kullanan Avaturkey oyun sunucusu.

## Gereksinimler

- Node.js 14+
- Redis 3.x+

## Kurulum

```bash
npm install
```

## Çalıştırma

Üretim:

```bash
npm start
```

Geliştirme (otomatik yeniden başlatma):

```bash
npm run dev
```

Varsayılan port: **8443** — `PORT` ortam değişkeni ile değiştirilebilir.

Redis bağlantısı için `REDIS_HOST` ve `REDIS_PORT` ortam değişkenlerini kullanabilirsiniz.

## Proje Yapısı

```
src/
├── config.js              Sunucu ve Redis yapılandırması
├── server.js              Socket.IO sunucu başlatıcı
├── constants/game.js      Oyun sabitleri (mağaza, görev, kutu)
├── handlers/              Socket olay işleyicileri
├── models/Player.js       Oyuncu modeli
├── redis/client.js        Redis istemcisi
├── services/              İş mantığı katmanı
└── utils/                 Yardımcı fonksiyonlar
```

## Socket Olayları

| Olay | Açıklama |
|------|----------|
| `spawn` | Bağlantı sonrası oyuncu verisi |
| `bilgi` | Giriş / profil yükleme |
| `magaza` | Mağaza satın alma |
| `odul` | Ödül talebi |
| `AC.GNDR` | Avacoin transferi |
| `promo` | Promosyon kodu |
| `kutu` | Günlük kutu |
| `itibar` | İtibar güncelleme |
| `hesap` | Hesap / klan düzenleme |
| `gorev` | Görev ilerlemesi |
| `set_bilgi` | Seviye güncelleme |
