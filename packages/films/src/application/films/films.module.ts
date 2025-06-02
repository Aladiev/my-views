import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from '../../domain/films/film.entity';
import { FilmsController } from './controllers/films.controller';
import { FilmsService } from './services/films.service';
import { FilmsRepository } from './repositories/films.repository';
import { ImageService } from './services/image.service';
import { FilmImage } from '../../domain/images/image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Film, FilmImage])],
  controllers: [FilmsController],
  providers: [FilmsService, FilmsRepository, ImageService],
})
export class FilmsModule {}
