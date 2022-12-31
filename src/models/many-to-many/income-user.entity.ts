import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { UserEntity } from "../user.entity";
import { IncomeEntity } from "../income.entity";

@Table
export class IncomeUserEntity extends Model {
  @ForeignKey(() => UserEntity)
  @Column
  userId: number;

  @ForeignKey(() => IncomeEntity)
  @Column
  incomeId: number;
}
