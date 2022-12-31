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
import { CreateUserDto, LoginUserDto } from "../dto/user.dto";
import { ValidateDtoPipe } from "../pipes/validate-dto.pipe";
import { HashPasswordPipe } from "../pipes/hash-password.pipe";
import { UserAccessibilityGuard } from "../guards/user-accessibility.guard";
import { RefreshTokenGuard } from "../guards/refresh-token.guard";

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
    const accessToken = await this.authServices.issueAccessToken(user.id);
    const refreshToken = await this.authServices.issueRefreshToken(user.id);
    return { user, accessToken, refreshToken };
  }

  @Post("/registration")
  @UseGuards(UserAccessibilityGuard)
  @UsePipes(ValidateDtoPipe, HashPasswordPipe)
  async createUser(@Body() body: CreateUserDto) {
    const user = await this.authServices.createUser(body);
    const accessToken = await this.authServices.issueAccessToken(user.id);
    const refreshToken = await this.authServices.issueRefreshToken(user.id);
    return { user, accessToken, refreshToken };
  }

  @Post("/refresh")
  @UseGuards(RefreshTokenGuard)
  async refreshToken(@Request() req) {
    const { updatedTokenId, id } = req.user;

    await this.authServices.deleteRefreshToken(updatedTokenId);
    const accessToken = await this.authServices.issueAccessToken(id);
    const refreshToken = await this.authServices.issueRefreshToken(id);
    return { accessToken, refreshToken };
  }
}
