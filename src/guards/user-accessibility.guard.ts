import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from "@nestjs/common";
import { AuthService } from "../features/auth/auth.service";
import { Request } from "express";

@Injectable()
export class UserAccessibilityGuard implements CanActivate {
  @Inject()
  private readonly authServices: AuthService;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const isEmailTaken = await this.authServices.checkEmailAccessibility(
      req.body.email,
    );
    if (isEmailTaken) {
      throw new BadRequestException("User email has been taken");
    }
    return true;
  }
}
