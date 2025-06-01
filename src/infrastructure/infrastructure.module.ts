
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './config/config';
import { Film } from '../domain/films/film.entity';
import { FilmImage } from '../domain/images/image.entity';
// import { TransactionsModule } from './transactions/transactions.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      ignoreEnvFile: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('pgConnectionString'),
        entities: [Film, FilmImage],
        synchronize: false,
        ssl: false,
      }),
      inject: [ConfigService],
    }),

    // TransactionsModule,
  ],
  exports: [
    TypeOrmModule,
    // TransactionsModule,
  ],
})
export class InfrastructureModule {}
