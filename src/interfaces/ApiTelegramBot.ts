import TelegramBot from "node-telegram-bot-api";

export interface ApiTelegramBot extends TelegramBot {
  sendMessageToDelete?: (chatId: number, message: string, delay: number) => Promise<void>;
}
