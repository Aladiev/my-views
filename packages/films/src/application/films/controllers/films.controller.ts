import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FilmsService } from '../services/films.service';
import { Film } from '../../../domain/films/film.entity';
import { CreateFilmRequestDto } from '../dtos/createFilm/createFilmRequest.dto';
import { SearchFilmsRequestDto } from '../dtos/searchFilms/searchFilmsRequest.dto';
import { SearchFilmsResponseDto } from '../dtos/searchFilms/searchFilmsResponse.dto';
import { ApiResponse200 } from '../../../shared/decorators/responses/apiResponse200.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from '../services/image.service';
import { Response } from 'express';

@Controller('films')
@ApiTags('Films')
export class FilmsController {
  constructor(
    private readonly filmsService: FilmsService,
    private imageService: ImageService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create film' })
  public createFilm(@Body() dto: CreateFilmRequestDto): Promise<Film> {
    return this.filmsService.createFilm(dto);
  }

  @Post('search')
  @ApiResponse200(SearchFilmsResponseDto)
  public searchFilms(@Body() dto: SearchFilmsRequestDto): Promise<SearchFilmsResponseDto> {
    return this.filmsService.searchFilms(dto);
  }

  @Post('images/upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
          description: 'Файл изображения для загрузки',
        },
      },
      required: ['image'],
    },
  })
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() file: Express.Multer.File): Promise<number> {
    const image = await this.imageService.createImage(file);

    return image.id;
  }

  @Get('images/:id')
  async getImage(@Param('id') id: number, @Res() res: Response) {
    const image = await this.imageService.getImage(+id);

    if (!image) {
      return res.status(404).send('Image not found');
    }

    res.setHeader('Content-Type', image.mimetype);
    res.send(image.data);
  }
}
