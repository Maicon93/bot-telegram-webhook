import { Send_signatures } from "../commands/Send_signatures";

const SEND_SIGNATURES = 'send_signatures'

export class ButtonClickController {
  async execute(params) {
    try {
      //onde vamos concentrar todas as chamadas de click de botao e distribuir para cada arquivo
      switch (params.callback_query.data) {
        case SEND_SIGNATURES:
          await Send_signatures(params)
          break;

        default:
          console.log('clicou em outro botão qualquer')
          break;
      }
    } catch (sendMessageError: any) {
      console.error('Erro ao enviar mensagem:', sendMessageError.message);
    }
  }
}
