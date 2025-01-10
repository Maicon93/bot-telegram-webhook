import { getTelegramApi } from "../helpers/TelegramHelper";


export async function Send_signatures(params: any) {
  try {
    const api = getTelegramApi(params.token)
    const chatId = params.callback_query.from.id

    await api.sendMessage(chatId, 'Enviou uma mensagem de texto qualquer!')
  } catch (sendMessageError: any) {
    console.error('Erro ao enviar mensagem:', sendMessageError.message);
  }
}
