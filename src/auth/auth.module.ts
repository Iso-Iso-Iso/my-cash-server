import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { UserEntity } from "../models/user.entity";
import { ENTITY_PROVIDERS } from "../constants/entity.const";
import { JwtEntity } from "../models/jwt.entity";
import { PassportModule } from "@nestjs/passport";
import { RefreshTokenStrategy } from "../guards/strategy/refresh-token.strategy";

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
    PassportModule,
  ],
  providers: [
    AuthService,
    { provide: ENTITY_PROVIDERS.USER, useValue: UserEntity },
    { provide: ENTITY_PROVIDERS.JWT, useValue: JwtEntity },
    RefreshTokenStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
