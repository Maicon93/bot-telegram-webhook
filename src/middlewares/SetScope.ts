import { NextFunction, Request, Response } from 'express';
import { GetAllBots } from '../assets/GetAllBots';
import { BotWebHook } from '../interfaces/BotsInterface';


export class SetScope {
  execute(req: Request, res: Response, next: NextFunction) {
    try {
      const tenant: number = Number(req.query.tenant)
      const bots: BotWebHook[] = new GetAllBots().execute();

      const botDefine = bots.find((a: BotWebHook) => a.tenant == tenant);

      if (!botDefine) {
        throw new Error(`Bot com tenant ${tenant} não encontrado.`);
      }

      req.body.tenant = tenant
      req.body.token = botDefine.token

      next()
    } catch (error) {
      res.status(200).send({ success: true, message: 'Webhook processado com erro' });
    }
  }
}
