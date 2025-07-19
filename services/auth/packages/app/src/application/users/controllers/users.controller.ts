import { Body, Controller, Delete, Get, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../../../shared/dto/users/CreateUser.dto';
import { UsersService } from '../services/users.service';
// import { CreateUserResponse } from '../../shared/dto/users/CreateUser.response';
import { User } from '../schemas/users.schema';
import { JwtAuthGuard } from '../../authorization/guards/jwt.guard';

@ApiTags('Users')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(public readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create User' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Create User',
    type: User,
  })
  public async createUser(@Body() dto: CreateUserDto): Promise<User> {
    return this.usersService.create(dto);
  }

  @Get()
  test() {
    return this.usersService.getAllUsers();
  }

  @Delete('clearAll')
  clearTable() {
    return this.usersService.clearTable();
  }
}
