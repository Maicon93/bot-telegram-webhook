import { Repository } from "typeorm";
import { User } from "../entities/User";
import { AppDataSource } from "../config/data-source";
import { BaseRepository } from "./BaseRepository";

export class UserRepository extends BaseRepository {
  protected repository: Repository<User>

  constructor() {
    super(User)
    this.repository = AppDataSource.getRepository(User)
  }

  async findOne(id: number): Promise<User | null> {
    return await this.repository.findOne({
      where: { id: id },
    });
  }

  async findUserTenants(id: number): Promise<User | null> {
    return await this.repository.findOne({
      where: { id: id },
      relations: ["user_tenants", "user_tenants.tenant"],
    });
  }
}
