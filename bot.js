const { Telegraf } = require('telegraf');
const fs = require('fs');

const bot = new Telegraf(process.env.BOT_TOKEN);
require('dotenv').config();

let bannedUsers;
try {
  bannedUsers = JSON.parse(fs.readFileSync('spam-users-id.json', 'utf8'));
} catch (error) {
  console.error(error);
  bannedUsers = [];
}

bot.command('add', async (ctx) => {
  const message = ctx.message;
  const chat = await ctx.telegram.getChat(message.chat.id);
  const chatMember = await ctx.telegram.getChatMember(message.chat.id, message.from.id);

  if (!message.from.is_bot && (chat.creator === message.from.id || chatMember.status === 'administrator')) {
    bannedUsers.push(message.reply_to_message.from.id);
    fs.writeFileSync('spam-users-id.json', JSON.stringify(bannedUsers));
    ctx.reply(`O usuário ${message.reply_to_message.from.first_name} foi adicionado à lista de usuários marcados como Spam/Bot.`);
  } else {
    ctx.reply('Você não tem permissão para adicionar usuários à lista de usuários banidos.');
  }
});

bot.on('new_chat_members', (ctx) => {
  const userId = ctx.message.new_chat_participant.id;
  if (bannedUsers.includes(userId)) {
    bot.telegram.kickChatMember(ctx.message.chat.id, userId);
    const userName = ctx.message.new_chat_participant.first_name;
    ctx.reply(` O úsuario ${userName}, foi banido pois está marcado como Spam/Bot. `);
  }
});

const startBot = async () => {
	try {
		await bot.launch();
		console.log('✅ - BanByID iniciado com sucesso.');
	} catch(error) {
		console.error(error);
	}
}

startBot();
