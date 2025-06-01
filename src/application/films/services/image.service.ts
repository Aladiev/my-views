import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilmImage } from '../../../domain/images/image.entity';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(FilmImage)
    private imageRepository: Repository<FilmImage>,
  ) {}

  async createImage(file: Express.Multer.File): Promise<FilmImage> {
    const image = new FilmImage();
    console.log(file);
    
    image.name = file.originalname;
    image.data = file.buffer;
    image.mimetype = file.mimetype;
    return this.imageRepository.save(image);
  }

  async getImage(id: number): Promise<FilmImage | null> {
    return this.imageRepository.findOneBy({ id });
  }
}


