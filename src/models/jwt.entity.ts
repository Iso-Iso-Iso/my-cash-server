import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { UserEntity } from "./user.entity";

@Table
export class JwtEntity extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => UserEntity)
  @Column
  userId: number;

  @BelongsTo(() => UserEntity)
  user: UserEntity;

  @Column({ primaryKey: true })
  uuid: string;
}
