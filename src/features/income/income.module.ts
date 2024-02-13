import { Module } from "@nestjs/common";
import { IncomeService } from "./income.service";
import { IncomeController } from "./income.controller";
import { AccessTokenStrategy } from "../../guards/strategy/access-token.strategy";
import { IncomeEntity } from "../../models/income.entity";
import { PassportModule } from "@nestjs/passport";
import { SequelizeModule } from "@nestjs/sequelize";

@Module({
  imports: [PassportModule, SequelizeModule.forFeature([IncomeEntity])],
  providers: [IncomeService, AccessTokenStrategy],
  controllers: [IncomeController],
})
export class IncomeModule {}
