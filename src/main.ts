import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { GlobalErrorHandlingFilter } from './utils/globalErrorHandling.filter';
import { ValidationPipe } from '@nestjs/common';
import { errorMessageExtract } from './utils/errorMessageExtract';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['debug', 'error', 'log', 'warn'],
  });
  const httpAdapter = app.get(HttpAdapterHost);
  app.setGlobalPrefix('event/api/v1');
  app.useGlobalFilters(new GlobalErrorHandlingFilter(httpAdapter));
  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
      transform: true,
      // whitelist:true,
      exceptionFactory: errorMessageExtract,
    }),
  );
  const PORT_NUMBER = app.get(ConfigService).get('PORT');
  await app.listen(PORT_NUMBER, () => {
    console.log(`Server Listening At Port`);
  });
}
bootstrap();
