import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./features/auth/auth.module";
import { DatabaseModule } from "./database/database.module";
import { IncomeModule } from "./features/income/income.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env${
        process.env.NODE_ENV == "development" ? ".develop" : ""
      }`,
    }),
    DatabaseModule,
    AuthModule,
    IncomeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
