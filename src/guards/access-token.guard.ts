import { AuthGuard } from "@nestjs/passport";
import { STRATEGY } from "../constants/startegy.const";

export class AccessTokenGuard extends AuthGuard(STRATEGY.ACCESS_TOKEN) {}
