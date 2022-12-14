import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import localStorage from '../store';
import AppModule from './app.module';
import { initialFakeDb } from './tree/entities/tree.mock';

async function bootstrap() {
  const logger = new Logger('bootstrap');

  localStorage.setItem(process.env.FAKE_DB_NAME, JSON.stringify(initialFakeDb));

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT || 3001, () =>
    logger.log(`App listening on port ${process.env.PORT || 3001}!`),
  );
}
bootstrap();
