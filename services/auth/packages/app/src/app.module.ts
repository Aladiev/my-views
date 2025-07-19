import { Module } from '@nestjs/common';
import { UsersModule } from './application/users/users.module';
import { AuthorizationModule } from './application/authorization/authorization.module';
import { MongooseModule } from '@nestjs/mongoose';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { RedisModule } from './application/redis/redis.module';

const mongoHost = process.env.MONGO_HOST ?? 'localhost';
const mongoPort = process.env.MONGO_PORT ?? '27017';
@Module({
  imports: [
    InfrastructureModule,
    UsersModule,
    AuthorizationModule,
    MongooseModule.forRoot(`mongodb://${mongoHost}:${mongoPort}`, {}),
    RedisModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
