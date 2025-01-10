import { startCommand } from "../commands/Start";
import { getTelegramApi } from "../helpers/TelegramHelper";

export class TextMessageController {
  async execute(params) {
    try {
      if (params.message.text == '/start') {
        return startCommand(params.token, params)
      }

      const api = getTelegramApi(params.token)
      const chatId = Number(params.message.from.id)

      await api.sendMessage(chatId, 'Enviou uma mensagem de texto qualquer!')
    } catch (error: any) {
      console.error('Erro ao processar o webhook:', error.message);
    }
  }
}
