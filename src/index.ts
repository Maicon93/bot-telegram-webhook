import express, { NextFunction, Request, Response } from 'express';
import { BotController } from './controller/BotController';
import { RegisterBots } from './services/RegisterBots';
import { TelegramBotService } from './services/telegram/TelegramBotService';
import { SetScope } from './middlewares/SetScope';
import 'dotenv/config';
import { AppDataSource } from './config/data-source';
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());

const setScope = new SetScope().execute;

AppDataSource.initialize().catch((err) => {
  console.error("Error during Data Source initialization:", err);
});

//new RegisterBots().register()

app.post('/webhook', setScope, async (req: Request, res: Response) => {
  try {
    res.status(200).send({ success: true, message: 'Webhook processado com sucesso' });

    await new BotController().receiveWebhookFromTelegram(req.body);
  } catch (error: any) {
    console.error('Erro ao processar o webhook:', error.message);
  }
});

// Limpeza periódica de bots inativos
setInterval(() => {
  const botService = TelegramBotService.getInstance();
  botService.cleanupExpiredInstances();
}, 10 * 60 * 1000);

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Aplicação executando na porta ${PORT}`)
})
