import { Sequelize } from "sequelize-typescript";
import { UserEntity } from "../models/user.entity";
import { JwtEntity } from "../models/jwt.entity";
import { IncomeEntity } from "../models/income.entity";

export const databaseProvider = [
  {
    provide: "SEQUELIZE",
    useFactory: async () => {
      console.log(process.env.HOST, "host");
      const sequelize = new Sequelize({
        dialect: "mysql",
        host: process.env.HOST || "localhost",
        port: +process.env.PORT || 3306,
        username: process.env.USER || "root",
        password: process.env.PASSWORD || "",
        database: process.env.DATABASE || "cp_money",
      });
      sequelize.addModels([UserEntity, JwtEntity, IncomeEntity]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
