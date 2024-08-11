import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { GlobalErrorHandlingFilter } from '@utils/globalErrorHandling.filter';
import { ValidationPipe } from '@nestjs/common';
import { errorMessageExtract } from '@utils/errorMessageExtract';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { join } from 'path';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['debug', 'error', 'log', 'warn'],
  });

  app.use(
    helmet({
      xPoweredBy: false, // Hides the X-Powered-By header or sets it to a custom value
    }),
  );
  app.enableCors({
    origin: '*',
  });
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new GlobalErrorHandlingFilter(httpAdapter));
  app.setGlobalPrefix('social-platform/api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
      transform: true,
      // whitelist:true,
      exceptionFactory: errorMessageExtract,
    }),
  );
  const PORT_NUMBER = await app.get(ConfigService).get('PORT');
  const config = new DocumentBuilder()
    .setTitle('Social Media Platform For Events.')
    .setDescription('Social Media Platform For Events Backend Service.')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'Bearer', bearerFormat: 'JWT' },
      'access-token',
    )
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(PORT_NUMBER, () => {
    console.log(`Server Listening At Port ${PORT_NUMBER}`);
  });
}
try {
  bootstrap();
} catch (error) {
  console.log(error, 'JKKKK');
}
