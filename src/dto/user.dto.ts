import {
  IsString,
  Length,
  IsEmail,
  IsNotEmpty,
  IsOptional,
} from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsOptional()
  surname?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @Length(8, 24)
  @IsNotEmpty()
  password: string;
}

export class LoginUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
