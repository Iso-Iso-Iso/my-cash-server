import { AuthGuard } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { STRATEGY } from "../constants/startegy.const";

@Injectable()
export class RefreshTokenGuard extends AuthGuard(STRATEGY.REFRESH_TOKEN) {}
