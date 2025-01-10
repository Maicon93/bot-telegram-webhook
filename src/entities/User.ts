import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Tenant } from "./Tenant";
import { UserTenant } from "./UserTenant";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("increment", { type: "bigint", unsigned: true })
  id!: number;

  @Column({ type: "varchar", length: 191, nullable: true })
  name?: string;

  @Column({ type: "varchar", length: 191, unique: true, nullable: false })
  email!: string;

  @Column({ type: "timestamp", nullable: true })
  email_verified_at?: Date;

  @Column({ type: "varchar", length: 191, nullable: false })
  password!: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  remember_token?: string;

  @Column({ type: "bigint", unsigned: true, nullable: true })
  @Index()
  tenant_id?: number; // Coluna usada como chave estrangeira

  @DeleteDateColumn({ type: "timestamp", nullable: true })
  deleted_at?: Date;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at!: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updated_at!: Date;

  @ManyToOne(() => Tenant, (tenant) => tenant.users, { onDelete: "SET NULL" })
  @JoinColumn({ name: "tenant_id" }) // Relaciona a coluna tenant_id com a tabela Tenant
  tenant: Tenant;

  @OneToMany(() => UserTenant, (userTenant) => userTenant.user)
  user_tenants!: UserTenant[];
}
