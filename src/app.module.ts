import { Module } from "@nestjs/common";

import { databaseProvider } from "./database/database.provider";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { DatabaseModule } from "./database/database.module";
import { IncomeModule } from "./income/income.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env${
        process.env.NODE_ENV == "production" ? ".develop" : ""
      }`,
    }),
    DatabaseModule,
    AuthModule,
    IncomeModule,
  ],
  controllers: [],
  providers: [...databaseProvider],
})
export class AppModule {}
