import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { UserEntity } from "../../models/user.entity";
import { JwtEntity } from "../../models/jwt.entity";
import { PassportModule } from "@nestjs/passport";
import { RefreshTokenStrategy } from "../../strategy/refresh-token.strategy";
import { SequelizeModule } from "@nestjs/sequelize";

@Module({
  imports: [
    SequelizeModule.forFeature([JwtEntity, UserEntity]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
    PassportModule,
  ],
  providers: [AuthService, RefreshTokenStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
