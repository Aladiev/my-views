import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from '../shared/config/plainConfig';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    })
  ],
  exports: [ConfigModule],
})
export class InfrastructureModule {}
