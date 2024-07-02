import { Controller, Get, UseGuards } from '@nestjs/common';
import { Auth0Guard } from '../auth/guards/auth0.guard'; 
@Controller()
export class UsersController {
  @UseGuards(Auth0Guard)
  @Get('protected')
  getProtected() {
    return { message: 'This is a protected route' };
  }
}
