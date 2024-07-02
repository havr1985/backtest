import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':auth0Id')
  async getUserByAuth0Id(@Param('auth0Id') auth0Id: string): Promise<User> {
    const user = await this.usersService.findOneByAuth0Id(auth0Id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
