import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const initSwagger = (app: INestApplication): void => {
  const options = new DocumentBuilder()
    .setTitle('Authorization')
    .setDescription('Authorization service')
    .addBearerAuth()
    .addSecurityRequirements('bearer');

  const document = SwaggerModule.createDocument(app, options.build());
  SwaggerModule.setup('api', app, document);
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.enableCors();

  initSwagger(app);

  await app.listen(3000);
}
bootstrap();
