import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  async validateUser(extraParams): Promise<any> {
    console.log(extraParams._json)
    const user = {
      auth0Id: extraParams._json.sub,
      email: extraParams._json.email,
      name: extraParams._json.nickname,
    };
    return this.usersService.findOrCreate(user);
  }
}
