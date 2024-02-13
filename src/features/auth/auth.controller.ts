import {
  Body,
  Controller,
  Inject,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
  UsePipes,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto, LoginUserDto } from "../../dto/user.dto";
import { ValidateDtoPipe } from "../../pipes/validate-dto.pipe";
import { HashPasswordPipe } from "../../pipes/hash-password.pipe";
import { UserAccessibilityGuard } from "../../guards/user-accessibility.guard";
import { RefreshTokenGuard } from "../../guards/refresh-token.guard";

@Controller("/api/auth")
export class AuthController {
  @Inject()
  private readonly authServices: AuthService;

  @Post("/login")
  @UsePipes(ValidateDtoPipe, HashPasswordPipe)
  async getUser(@Body() body: LoginUserDto) {
    const user = await this.authServices.findUserByEmail(body.email);
    if (!user || user.password !== body.password) {
      throw new UnauthorizedException();
    }

    const tokens = await this.authServices.issueTokensPair(user);
    return { user, ...tokens };
  }

  @Post("/registration")
  @UseGuards(UserAccessibilityGuard)
  @UsePipes(ValidateDtoPipe, HashPasswordPipe)
  async createUser(@Body() body: CreateUserDto) {
    const user = await this.authServices.createUser(body);
    const tokens = await this.authServices.issueTokensPair(user);
    return { user, ...tokens };
  }

  @Post("/refresh")
  @UseGuards(RefreshTokenGuard)
  async refreshToken(@Request() req) {
    const { tokenId, userEntity } = req.user;
    await this.authServices.deleteRefreshToken(tokenId);
    return await this.authServices.issueTokensPair(userEntity);
  }
}
