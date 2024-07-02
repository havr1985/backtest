import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  @UseGuards(AuthGuard('auth0'))
  @Get('protected')
  getProtected() {
    return { message: 'This is a protected route' };
  }
}
