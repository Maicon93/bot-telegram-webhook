import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { UserTenant } from "./UserTenant";

@Entity("tenants")
export class Tenant {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column({ type: "varchar", length: 191 })
  name!: string;

  @Column({ type: "varchar", length: 191, nullable: true })
  video_telegram_id?: string;

  @Column({ type: "text", nullable: true })
  telegram_session?: string;

  @Column({ type: "bigint", nullable: true })
  system_payment_plan_id?: number;

  @Column({ type: "tinyint", default: 1 })
  sell_community!: boolean;

  @Column({ type: "tinyint", default: 1 })
  sell_course!: boolean;

  @Column({ type: "tinyint", default: 0 })
  is_new_register!: boolean;

  @Column({ type: "tinyint", default: 0 })
  is_commission!: boolean;

  @Column({ type: "text", nullable: true })
  business_description?: string;

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

  @OneToMany(() => User, (user) => user.tenant)
  users!: User[];

  @OneToMany(() => UserTenant, (userTenant) => userTenant.tenant)
  user_tenants!: UserTenant[];
}
