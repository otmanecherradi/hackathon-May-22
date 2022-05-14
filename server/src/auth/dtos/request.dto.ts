import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignupDto {
  @IsEmail()
  mail: string;

  @IsNotEmpty()
  pwd: string;

  @IsNotEmpty()
  fullName: string;
}

export class SignInDto {
  @IsEmail()
  @IsNotEmpty()
  mail: string;

  @IsNotEmpty()
  pwd: string;
}
