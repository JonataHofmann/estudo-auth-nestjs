import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  const options = new DocumentBuilder()
    .setTitle('Estudos NestJS')
    .setDescription('Estudos sobre NestJS, Authenticação, TypeORM, etc.')
    .setVersion('1.0')
    .addTag('NestJS')
    // .addBearerAuth(
    //   {
    //     type: 'http',
    //     in: 'header',
    //     name: 'Authorization',
    //     bearerFormat: 'JWT',
    //     description: 'Token de Autorização',
    //     scheme: 'Bearer',
    //   },
    //   'Authorization',
    // )
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  const port = parseInt(process.env.PORT) || 8080;
  await app.listen(port, '0.0.0.0');
}
bootstrap();
