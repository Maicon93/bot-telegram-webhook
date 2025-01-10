import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";
import { Tenant } from "./Tenant";
import { User } from "./User";

@Entity("approvals")
export class Approval {
  @PrimaryGeneratedColumn("increment", { type: "bigint", unsigned: true })
  id!: number;

  @Column({ type: "bigint", unsigned: true })
  tenant_id!: number;

  @Column({ type: "bigint", unsigned: true })
  response_by!: number;

  @Column({ type: "tinyint", default: 0 })
  approved!: boolean;

  @Column({ type: "timestamp", nullable: true })
  response_at?: Date;

  @Column({ type: "timestamp", nullable: true })
  start_tour_at?: Date;

  @Column({ type: "json", nullable: true })
  rejected_fields?: object;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at!: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updated_at!: Date;

  @DeleteDateColumn({ type: "timestamp", nullable: true })
  deleted_at?: Date;

  @ManyToOne(() => Tenant, { onDelete: "RESTRICT", nullable: false })
  @JoinColumn({ name: "tenant_id" }) // Relaciona com a tabela tenants
  tenant!: Tenant;

  @ManyToOne(() => User, { onDelete: "RESTRICT", nullable: false })
  @JoinColumn({ name: "response_by" }) // Relaciona com a tabela users
  response_by_user!: User;
}
