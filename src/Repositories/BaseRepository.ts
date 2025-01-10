import { Repository } from "typeorm";
import { AppDataSource } from "../config/data-source";

export class BaseRepository {
  protected repository: Repository<any>;

  constructor(entity: any) {
    this.repository = AppDataSource.getRepository(entity);
  }

  async findAll(): Promise<any[]> {
    return this.repository.find();
  }

  async findById(id: number): Promise<any | null> {
    return this.repository.findOneBy({ id });
  }

  async create(data: Partial<any>): Promise<any> {
    const record = this.repository.create(data);
    return this.repository.save(record);
  }

  async update(id: number, data: Partial<any>): Promise<any | null> {
    await this.repository.update(id, data);
    return this.findById(id);
  }

  async softDelete(id: number): Promise<void> {
    await this.repository.softDelete(id);
  }
}
