const TelegramBot = require('node-telegram-bot-api');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const token = '7382368257:AAH7pADwsp_KUqRPVvVI5hofap6xX5kwgWY';

const bot = new TelegramBot(token, { polling: true });

function isBusinessHours() {
  const now = new Date();
  const hours = now.getHours();
  const day = now.getDay();

  // Verifica se é um dia útil (segunda a sexta)
  if (day < 1 || day > 5) {
    return false;
  }

  // Verifica se está no horário comercial (09:00 às 18:00)
  return hours >= 9 && hours < 18;
}

// Evento de mensagem recebida
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;

  if (isBusinessHours()) {
    bot.sendMessage(chatId, 'https://faesa.br');
  } else {
    bot.sendMessage(chatId, 'Estamos fora do horário comercial (09:00 às 18:00). Por favor, forneça seu email para que possamos entrar em contato:');
    
    // Espera pela resposta com o email
    bot.once('message', async (reply) => {
      const email = reply.text;

      // Salva o email no banco de dados usando Prisma
      try {
        await prisma.user.create({
          data: { email }
        });
        bot.sendMessage(chatId, 'Obrigado! Seu email foi salvo com sucesso.');
      } catch (error) {
        console.error('Erro ao salvar email:', error);
        bot.sendMessage(chatId, 'Houve um erro ao salvar seu email. Por favor, tente novamente.');
      }
    });
  }
});


process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit();
});
