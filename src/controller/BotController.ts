import { UserRepository } from "../Repositories/UserRepository";
import { ButtonClickController } from "./ButtonClickController";
import { TextMessageController } from "./TextMessageController";

export class BotController {
  constructor(
    private userRepository: UserRepository = new UserRepository(),
  ) {}

  async receiveWebhookFromTelegram(body: any) {
    try {
      if (body?.callback_query) {
        return await new ButtonClickController().execute(body)
      }

      const user: any = await this.userRepository.findOne(6);

      return await new TextMessageController().execute(body)
    } catch (error: any) {
      console.error('Erro ao processar o webhook:', error.message)
    }
  }
}
