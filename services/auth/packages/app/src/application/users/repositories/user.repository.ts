import { Injectable } from '@nestjs/common';
import { User } from '../schemas/users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private readonly model: Model<User>) {}

  public save(user: User): Promise<User> {
    return user.save();
  }

  public findOneByEmailAndPassword(email: string, password: string): Promise<User | null> {
    return this.model.findOne({
      email, password
    }).exec()
  }

  public async clearTable(): Promise<void> {
    await this.model.deleteMany({});
  }

  public findAllUsers(): Promise<User[]> {
    return this.model.find({});
  }
}
