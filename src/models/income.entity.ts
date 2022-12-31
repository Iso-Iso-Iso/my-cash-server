import { BelongsToMany, Column, Model, Table } from "sequelize-typescript";
import { IncomeType } from "../constants/income.const";
import { UserEntity } from "./user.entity";
import { IncomeUserEntity } from "./many-to-many/income-user.entity";

@Table
export class IncomeEntity extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  type: IncomeType;

  @Column
  amount: number;

  @BelongsToMany(() => UserEntity, () => IncomeUserEntity)
  users: UserEntity[];
}
