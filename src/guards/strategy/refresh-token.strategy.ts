import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../../auth/auth.service";
import { STRATEGY } from "../../constants/startegy.const";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  STRATEGY.REFRESH_TOKEN,
) {
  @Inject()
  private readonly authServices: AuthService;

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    console.log(payload);
    const { uuid } = payload;
    const token = await this.authServices.findRefreshTokenByUuid(uuid);

    if (!token) {
      throw new UnauthorizedException("User session was expired");
    }

    return { tokenUuid: token, id: token.userId };
  }
}
