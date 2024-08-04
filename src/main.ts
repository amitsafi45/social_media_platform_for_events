import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['debug', 'error', 'log', 'warn'],
  });
  const httpAdapter = app.get(HttpAdapterHost);
  app.setGlobalPrefix('event/api/v1');
  const PORT_NUMBER = app.get(ConfigService).get('PORT');
  await app.listen(PORT_NUMBER, () => {
    console.log(`Server Listening At Port`);
  });
}
bootstrap();
