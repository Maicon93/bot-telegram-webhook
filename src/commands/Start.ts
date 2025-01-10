import { getTelegramApi } from "../helpers/TelegramHelper";

export async function startCommand(botToken: string, params: any) {
  try {
    const button = {
      reply_markup: {
        inline_keyboard: [
          [{ text: '⭐️ Grupo Vip', callback_data: 'send_signatures' }],
          [{ text: '✨ Comprar conteúdo avulso', callback_data: 'send_single_content' }]
        ]
      }
    };

    const api = getTelegramApi(botToken);
    const chatId = params.message.from.id

    await api.sendMessage(chatId, 'Saiba mais acessando os botões abaixo!', button)
  } catch (sendMessageError: any) {
    console.error('Erro ao enviar mensagem:', sendMessageError.message);
  }
}
