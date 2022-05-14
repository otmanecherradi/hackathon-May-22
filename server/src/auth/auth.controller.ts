import {
  Controller,
  Post,
  Body,
  Logger,
  BadRequestException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { PrismaService } from '../shared/prisma/prisma.service';

import { AuthService } from './auth.service';

import { SignupDto, SignInDto } from './dtos/request.dto';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly authService: AuthService,
  ) {}

  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    this.logger.log('signup flow');

    const userExists = await this.prismaService.user.findFirst({
      where: { email: signupDto.mail },
    });

    if (userExists !== null) {
      throw new BadRequestException();
    }

    const hashedPassword = await this.authService.getHashedPassword(
      signupDto.pwd,
    );

    const role = await this.prismaService.role.findFirst({
      where: { name: 'User' },
    });

    await this.prismaService.user.create({
      data: {
        email: signupDto.mail,
        fullName: signupDto.fullName,
        password: hashedPassword,
        roleId: role.id,
      },
    });
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    this.logger.log('login flow');

    return this.authService.getToken(req.user);
  }
}
