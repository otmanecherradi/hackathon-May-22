import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { User } from '@prisma/client';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async getHashedPassword(pwd: string) {
    const hash = await bcrypt.hash(
      pwd,
      +this.configService.get<number>('ROUNDS'),
    );

    return hash;
  }

  checkPassword(pwd: string, hashedPassword: string) {
    return bcrypt.compare(pwd, hashedPassword);
  }

  async getToken(user: User) {
    return {
      accessToken: this.jwtService.sign(
        { userId: user.id },
        {
          audience: user.id,
          issuer: 'nestJS',
        },
      ),
    };
  }
}
