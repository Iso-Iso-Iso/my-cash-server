import { Module } from "@nestjs/common";
import { IncomeService } from "./income.service";
import { IncomeController } from "./income.controller";
import { AccessTokenStrategy } from "../guards/strategy/access-token.strategy";
import { IncomeEntity } from "../models/income.entity";
import { ENTITY_PROVIDERS } from "../constants/entity.const";
import { PassportModule } from "@nestjs/passport";

@Module({
  imports: [PassportModule],
  providers: [
    IncomeService,
    AccessTokenStrategy,
    {
      provide: ENTITY_PROVIDERS.INCOME,
      useValue: IncomeEntity,
    },
  ],
  controllers: [IncomeController],
})
export class IncomeModule {}
