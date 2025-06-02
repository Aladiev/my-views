import { Module } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { FilmsModule } from './application/films/films.module';

@Module({
  imports: [
    InfrastructureModule, 
    FilmsModule,
  ],
})
export class AppModule {}
