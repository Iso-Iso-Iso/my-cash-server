import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UserEntity } from "../models/user.entity";
import { JwtEntity } from "../models/jwt.entity";
import { IncomeEntity } from "../models/income.entity";

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: "mysql",
      host: process.env.HOST || "localhost",
      port: +process.env.PORT || 3306,
      username: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_SCHEMA || "cp_money",
      models: [UserEntity, JwtEntity, IncomeEntity],
      sync: {
        force: true,
      },
      autoLoadModels: true,
      synchronize: true,
    }),
  ],
  exports: [SequelizeModule],
})
export class DatabaseModule {}
