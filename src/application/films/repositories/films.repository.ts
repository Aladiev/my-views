import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from '../../../domain/films/film.entity';
import { DataSource, Like, Repository } from 'typeorm';

@Injectable()
export class FilmsRepository {
  constructor(
    @InjectRepository(Film)
    private readonly repository: Repository<Film>,
    @Inject(DataSource) private readonly dataSource: DataSource,
  ) {}

  public save(film: Film): Promise<Film> {
    return this.repository.save(film);
  }

  public findByTitlePattern(pattern: string): Promise<Film[]> {
    return this.dataSource
      .createQueryBuilder(Film, 'film')
      .select()
      .where({ title: Like(`%${pattern}%`) })
      .getMany();
  }
}
