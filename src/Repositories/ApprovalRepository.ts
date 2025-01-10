import { Repository } from "typeorm";
import { AppDataSource } from "../config/data-source";
import { BaseRepository } from "./BaseRepository";
import { Approval } from "../entities/Approvals";

export class ApprovalRepository extends BaseRepository {
  protected repository: Repository<Approval>;

  constructor() {
    super(Approval);
    this.repository = AppDataSource.getRepository(Approval);
  }

  // Inserir métodos.
}
