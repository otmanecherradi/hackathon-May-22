import { Logger, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';

import { AuthService } from './auth.service';

import { JwtStrategy } from './jwt.strategy';

import { SharedModule } from '../shared/shared.module';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),

    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET_KEY'),
          signOptions: {
            expiresIn: configService.get<string>('JWT_EXPIRATION_TIME'),
          },
        };
      },
      inject: [ConfigService],
    }),

    SharedModule,
  ],

  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {
  private readonly logger = new Logger(AuthModule.name);
}
