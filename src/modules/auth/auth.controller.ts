import { Controller, Get, Req, UseGuards, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Get('callback')
  @UseGuards(AuthGuard('auth0'))
  async authCallback(@Req() req) {
    this.logger.log('Auth Callback invoked');
    this.logger.log('User:', req.user);
    console.log('req.user', req.user)

    try {
      const user = await this.authService.validateUser(req.user.extraParams);
      return { user };
    } catch (err) {
      this.logger.error('Error in authCallback:', err);
      throw err;
    }
  }
}
