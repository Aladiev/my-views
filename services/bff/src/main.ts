import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const initSwagger = (app: INestApplication): void => {
  const options = new DocumentBuilder()
    .setTitle('Bff')
    .setDescription('Authorization service')
    .addBearerAuth()
    .addSecurityRequirements('bearer');

  const document = SwaggerModule.createDocument(app, options.build());
  SwaggerModule.setup('api', app, document);
};


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  initSwagger(app);

  await app.listen(process.env.PORT ?? 3105);
}
bootstrap();
