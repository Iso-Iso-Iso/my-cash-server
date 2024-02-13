import { Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserEntity } from "../../models/user.entity";
import { JwtEntity } from "../../models/jwt.entity";
import { v4 } from "uuid";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class AuthService {
  @Inject()
  private readonly jwtService: JwtService;

  @InjectModel(UserEntity)
  private readonly userEntity: typeof UserEntity;

  @InjectModel(JwtEntity)
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

  async issueTokensPair(user: UserEntity) {
    const accessToken = await this.issueAccessToken(user.id, user.email);
    const refreshToken = await this.issueRefreshToken(user.id);
    return { accessToken, refreshToken };
  }

  async issueAccessToken(userId: number, email: string) {
    return await this.jwtService.signAsync(
      { userId, email },
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
    return await this.jwtEntity.findOne({
      where: { uuid },
      include: [UserEntity],
    });
  }

  async deleteRefreshToken(id) {
    return await this.jwtEntity.destroy({ where: { id } });
  }
}
