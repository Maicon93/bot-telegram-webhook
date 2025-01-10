import { BotWebHook } from "../interfaces/BotsInterface";

export class GetAllBots {
  execute() {
    try {
      //aqui tratar lógica de pegar todos os bots e setar essas informações para cada bot
        const baseUrl: string = String(process.env.BASE_URL)
        const Bots: BotWebHook[] = [
          {
            tenant: 1,
            token: '7667063957:AAHxTnogI5FHY6aM10WIID60Afmj8YTuXLA',
            webhookUrl: `${baseUrl}/webhook?tenant=1`
          }
        ]

        return Bots;
    } catch (error: any) {
      return [];
    }
  }
}
