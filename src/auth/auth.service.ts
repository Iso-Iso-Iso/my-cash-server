import { Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserEntity } from "../models/user.entity";
import { ENTITY_PROVIDERS } from "../constants/entity.const";
import { JwtEntity } from "../models/jwt.entity";
import { v4 } from "uuid";

@Injectable()
export class AuthService {
  @Inject()
  private readonly jwtService: JwtService;

  @Inject(ENTITY_PROVIDERS.USER)
  private readonly userEntity: typeof UserEntity;

  @Inject(ENTITY_PROVIDERS.JWT)
  private readonly jwtEntity: typeof JwtEntity;

  async checkEmailAccessibility(userEmail: string) {
    const user = await this.userEntity.findOne({ where: { email: userEmail } });
    return !!user;
  }

  async createUser(user) {
    return await this.userEntity.create(user, {
      raw: true,
    });
  }

  async findUserByEmail(email: string) {
    return await this.userEntity.findOne({ where: { email } });
  }

  async issueAccessToken(userId: number) {
    return await this.jwtService.signAsync(
      { userId },
      {
        expiresIn: "5m",
        secret: process.env.JWT_SECRET,
      },
    );
  }

  async issueRefreshToken(userId: number) {
    const uuid = v4();

    const token = await this.jwtService.signAsync(
      { uuid },
      {
        expiresIn: "14d",
        secret: process.env.JWT_SECRET,
      },
    );

    await this.jwtEntity.create({ userId, uuid });
    return token;
  }

  async findRefreshTokenByUuid(uuid) {
    return await this.jwtEntity.findOne({ where: { uuid } });
  }

  async deleteRefreshToken(id) {
    return await this.jwtEntity.destroy({ where: { id } });
  }
}
