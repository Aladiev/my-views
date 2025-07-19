import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { User } from '../schemas/users.schema';
import { CreateUserDto } from '../../../shared/dto/users/CreateUser.dto';

@Injectable()
export class UserFactory {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  public async create(dto: CreateUserDto): Promise<User> {
    return new this.userModel(dto);
  }
}
