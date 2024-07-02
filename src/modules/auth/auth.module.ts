import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import * as dotenv from 'dotenv';
import { AuthController } from './auth.controller';
import { Auth0Strategy } from './strategies/auth0.strategy';

dotenv.config();

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.AUTH0_CLIENT_SECRET,
      signOptions: { expiresIn: '60m' },
    }),
    UsersModule,
  ],
  providers: [AuthService, Auth0Strategy],
  controllers:[AuthController],
  exports: [AuthService],
})
export class AuthModule {}
