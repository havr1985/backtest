import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async findOrCreate(user: {
    auth0Id: string;
    email: string;
    name: string;
  }): Promise<User> {
    const [foundUser] = await this.userModel.findOrCreate({
      where: { auth0Id: user.auth0Id },
      defaults: user,
    });
    return foundUser;
  }

  async findOneByAuth0Id(auth0Id: string): Promise<User | undefined> {
    return this.userModel.findOne({ where: { auth0Id } });
  }
}
