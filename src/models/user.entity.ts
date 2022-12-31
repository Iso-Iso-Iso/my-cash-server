import { BelongsToMany, Column, Model, Table } from "sequelize-typescript";
import { IncomeEntity } from "./income.entity";
import { IncomeUserEntity } from "./many-to-many/income-user.entity";

@Table
export class UserEntity extends Model {
  @Column({ autoIncrement: true, primaryKey: true })
  id: number;

  @Column
  name: string;

  @Column
  surname: string;

  @Column({ primaryKey: true })
  email: string;

  @Column({ primaryKey: true })
  password: string;

  @Column
  pin: string;

  @BelongsToMany(() => IncomeEntity, () => IncomeUserEntity)
  incomes: IncomeEntity[];
}
