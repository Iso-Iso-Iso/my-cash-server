import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { IncomeType } from "../constants/income.const";
import { UserEntity } from "./user.entity";

@Table
export class IncomeEntity extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  name: string;

  @Column
  type: IncomeType;

  @Column
  amount: number;

  @ForeignKey(() => UserEntity)
  @Column
  userId: number;

  @BelongsTo(() => UserEntity)
  user: UserEntity;
}
