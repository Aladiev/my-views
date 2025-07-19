import { Injectable } from '@nestjs/common';
// import { CreateUserResponse } from '../../shared/dto/users/CreateUser.response';
import { CreateUserDto } from '../../../shared/dto/users/CreateUser.dto';
import { UserFactory } from '../factories/users.factory';
import { UsersRepository } from '../repositories/user.repository';
import { User } from '../schemas/users.schema';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly usersFactory: UserFactory,
  ) {}

  public async create(userDto: CreateUserDto): Promise<User> {
    const user = await this.usersFactory.create(userDto);
    const savedUser = await this.usersRepository.save(user);
    return savedUser;
  }

  public async findOneByEmailAndPassword(email: string, password: string): Promise<User | null> {
    return this.usersRepository.findOneByEmailAndPassword(email, password);
  }

  clearTable() {
    return this.usersRepository.clearTable();
  }

  getAllUsers(): Promise<User[]> {
    return this.usersRepository.findAllUsers();
  }
}
