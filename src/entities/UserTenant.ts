import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";
import { Tenant } from "./Tenant";

@Entity("user_tenants")
export class UserTenant {
  @PrimaryGeneratedColumn("increment", { type: "bigint", unsigned: true })
  id!: number;

  @Column({ type: "bigint", unsigned: true })
  user_id!: number;

  @Column({ type: "bigint", unsigned: true })
  tenant_id!: number;

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" }) // Relaciona com a tabela users
  user!: User;

  @ManyToOne(() => Tenant, { onDelete: "CASCADE" })
  @JoinColumn({ name: "tenant_id" }) // Relaciona com a tabela tenants
  tenant!: Tenant;
}
