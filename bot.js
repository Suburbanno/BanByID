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
  fs.writeFileSync('spam-users-id.json', JSON.stringify(bannedUsers));
}

bot.command('add', (ctx) => {
  if (ctx.from.id === xxxxxxxx) {
    const message = ctx.message;
    const userId = message.reply_to_message.from.id;
    if (!bannedUsers.includes(userId)) {
      ctx.telegram.KickChatMember(message.chat.id, userId)
      bannedUsers.push(userId);
      fs.writeFileSync('spam-users-id.json', JSON.stringify(bannedUsers));
      ctx.reply(`O usuário ${message.reply_to_message.from.first_name} foi adicionado à lista de usuários marcados como Spam/Bot e foi banido do grupo.`);
    } else {
      ctx.reply(`O usuário ${message.reply_to_message.from.first_name} já está na lista de usuários marcados como Spam/Bot.`);
    }
  } else {
    ctx.reply('Você não tem permissão para adicionar usuários na lista de usuários banidos.');
  }
});


bot.command('deleteid', (ctx) => {
  if (ctx.from.id === xxxxxxxx) {
    const message = ctx.message;
    const userId = message.reply_to_message.from.id;
    const index = bannedUsers.indexOf(userId);
    if (index > -1) {
      bannedUsers.splice(index, 1);
      fs.writeFileSync('spam-users-id.json', JSON.stringify(bannedUsers));
      ctx.reply(`O usuário ${message.reply_to_message.from.first_name} foi removido da lista de usuários marcados como Spam/Bot.`);
    } else {
      ctx.reply(`O usuário ${message.reply_to_message.from.first_name} não está na lista de usuários marcados como Spam/Bot.`);
    }
  } else {
    ctx.reply('Você não tem permissão para remover usuários da lista de usuários banidos.');
  }
});

bot.command('count', (ctx) => {
  ctx.reply(`Existem ${bannedUsers.length} usuários na lista de usuários marcados como Spam/Bot.`);
});

bot.command('list', (ctx) => {
  if (bannedUsers.length > 0) {
      ctx.reply(`Lista de usuários marcados como Spam/Bot: ${bannedUsers.join(', ')}`);
  } else {
      ctx.reply(`Não há usuários marcados como Spam/Bot na lista.`);
  }
});

bot.on('new_chat_members', (ctx) => {
  const userId = ctx.message.new_chat_participant.id;
  if (bannedUsers.includes(userId)) {
    ctx.telegram.kickChatMember(ctx.message.chat.id, userId);
    const userName = ctx.message.new_chat_participant.first_name;
    ctx.reply(` O usuário ${userName}, foi banido pois está marcado como Spam/Bot. `);
  }
});

bot.catch((err) => {
    console.log('Error:', err)
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
