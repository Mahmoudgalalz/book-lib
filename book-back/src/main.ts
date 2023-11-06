import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ErrorResponse } from './shared/error.response';

async function bootstrap() {
  const PORT = (process.env.PORT)|| 9000;
  const app = await NestFactory.create(AppModule);
  const corsOption = {
    origin: '*',
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  };
  app.enableCors(corsOption);
  app.useGlobalFilters(new ErrorResponse());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT, () =>
    Logger.log(`BookSystem backend has awoken on: ${PORT}.`),
  );
}
bootstrap();
