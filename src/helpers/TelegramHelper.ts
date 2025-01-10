import TelegramBot from 'node-telegram-bot-api';
import { TelegramBotService } from '../services/telegram/TelegramBotService';
import { ApiTelegramBot } from '../interfaces/ApiTelegramBot';


export function getTelegramApi(token: string): ApiTelegramBot {
  const botService = TelegramBotService.getInstance();
  const api = botService.getBotInstance(token);

  (api as ApiTelegramBot).sendMessageToDelete = async (chatId: number, message: string) => {
    try {
      // deletar outras mensagens
      await api.sendMessage(chatId, message);
    } catch (error) {
      console.error('Erro no sendMessageToDelete:', error);
    }
  };

  return api as ApiTelegramBot;
}
