const Discord = require('discord.js');
const client = new Discord.Client();
const binanceAPI = require('binance-api-node').default;

const binanceClient = binanceAPI();

client.on('message', async (message) => {
  if (message.content.startsWith('!kontrol')) {
    const args = message.content.split(' ');
    if (args.length === 2) {
      const coin = args[1].toUpperCase() + 'USDT'; // Kripto paranın adını büyük harflere çevir ve USDT ile birleştir
      try {
        const ticker = await binanceClient.dailyStats({ symbol: coin });
        const currentPrice = parseFloat(ticker.lastPrice);
        message.channel.send(`Mevcut fiyatı ${coin}: $${currentPrice}`);
      } catch (error) {
        message.channel.send('Geçersiz kripto para adı!');
      }
    } else {
      message.channel.send('Geçersiz komut! Örnek kullanım: !kontrol BTC');
    }
  }
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login('YOUR_DISCORD_BOT_TOKEN');
