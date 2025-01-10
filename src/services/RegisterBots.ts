import TelegramBot from 'node-telegram-bot-api';
import { GetAllBots } from '../assets/GetAllBots';
import { BotWebHook } from '../interfaces/BotsInterface';

export class RegisterBots {
    async register() {
        const bots: BotWebHook[] = new GetAllBots().execute();

        const results = await Promise.all(
            bots.map(async (bot: BotWebHook) => {
                try {
                    const webhookUrl = bot.webhookUrl;

                    const telegramBot = new TelegramBot(bot.token);

                    //await telegramBot.deleteWebHook();
                    await telegramBot.setWebHook(webhookUrl);
                    return true;
                } catch (error: any) {
                    console.error(`Erro ao registrar webhook para o bot do tenant ${bot.tenant}:`, error.message);
                    return false;
                }
            })
        );

        const successCount = results.filter((result) => result).length;

        console.log(`Total de bots registrados com sucesso: ${successCount}`);
        return successCount;
    }
}
