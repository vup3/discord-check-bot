const Discord = require('discord.js');
const client = new Discord.Client();
const binanceAPI = require('binance-api-node').default;

const binanceClient = binanceAPI();

client.on('message', async (message) => {
  if (message.content.startsWith('!control')) {
    const args = message.content.split(' ');
    if (args.length === 2) {
      const coin = args[1].toUpperCase() + 'USDT'; // Convert the name of your cryptocurrency to uppercase letters and combine it with USDT
      try {
        const ticker = await binanceClient.dailyStats({ symbol: coin });
        const currentPrice = parseFloat(ticker.lastPrice);
        message.channel.send(`Mevcut fiyatı ${coin}: $${currentPrice}`);
      } catch (error) {
        message.channel.send('Invalid cryptocurrency name!');
      }
    } else {
      message.channel.send('Invalid command! Example usage: !check BTC');
    }
  }
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login('YOUR_DISCORD_BOT_TOKEN');
