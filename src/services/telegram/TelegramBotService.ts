import TelegramBot from 'node-telegram-bot-api';

type CachedBot = {
    instance: TelegramBot;
    lastUsed: number;
};

export class TelegramBotService {
    private static instance: TelegramBotService;
    private botInstances: Record<string, CachedBot> = {};
    private ttl: number = 10 * 60 * 1000; // tempo de duração do cache da instancia

    private constructor() {}

    public static getInstance(): TelegramBotService {
        if (!TelegramBotService.instance) {
            TelegramBotService.instance = new TelegramBotService();
        }
        return TelegramBotService.instance;
    }

    public getBotInstance(token: string): TelegramBot {
        const now = Date.now();

        if (this.botInstances[token] && now - this.botInstances[token].lastUsed < this.ttl) {
            this.botInstances[token].lastUsed = now;
            return this.botInstances[token].instance;
        }

        const bot = new TelegramBot(token, { polling: false });
        this.botInstances[token] = { instance: bot, lastUsed: now };
        return bot;
    }

    public cleanupExpiredInstances(): void {
        const now = Date.now();
        for (const token in this.botInstances) {
            if (now - this.botInstances[token].lastUsed >= this.ttl) {
                console.log(`Removendo instância expirada para o token: ${token}`);
                delete this.botInstances[token];
            }
        }
    }

    public listCachedBots(): string[] {
        return Object.keys(this.botInstances);
    }
}
