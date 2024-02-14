import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { STRATEGY } from "../constants/startegy.const";

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  STRATEGY.ACCESS_TOKEN,
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.JWT_SECRET,
    });
  }
  async validate(payload: any) {
    const { userId, email } = payload;
    return { userId, email };
  }
}
