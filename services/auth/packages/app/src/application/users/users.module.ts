import { Module } from '@nestjs/common';
import { UsersController } from '../../application/users/controllers/users.controller';
import { UsersService } from '../../application/users/services/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema, User } from './schemas/users.schema';
import { UsersRepository } from './repositories/user.repository';
import { UserFactory } from './factories/users.factory';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UsersSchema }])],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, UserFactory],
  exports: [UsersService],
})
export class UsersModule {}
