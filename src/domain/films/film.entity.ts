import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateFilmRequestDto } from '../../application/films/dtos/createFilm/createFilmRequest.dto';

@Entity({ name: 'films' })
export class Film {
  @ApiProperty({ example: 1, description: 'Film id' })
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Начало' })
  @Column({ type: 'text', name: 'title', nullable: false })
  title: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 2008 })
  @Column({ type: 'smallint', name: 'year', nullable: false })
  year: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 148 * 60 })
  @Column({ type: 'smallint', name: 'duration', nullable: false })
  duration: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 1 })
  @Column({ type: 'int', name: 'image_id', nullable: false })
  imageId: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Фильм Кристофера Нолана' })
  @Column({ type: 'text', name: 'description', nullable: false })
  description: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: false })
  updatedAt: Date;

  public static create(dto: CreateFilmRequestDto): Film {
    const film = new Film();

    film.title = dto.title;
    film.year = dto.year;
    film.duration = dto.duration;
    film.description = dto.description;
    film.imageId = dto.imageId;
    film.createdAt = new Date();
    film.updatedAt = new Date();

    return film;
  }
}
