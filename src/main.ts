import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Add port
  const configService = app.get(ConfigService);
  const port = configService.get('port');

  // Add pipe check validation
  app.useGlobalPipes(new ValidationPipe());

  // Add swagger docs
  const config = new DocumentBuilder()
    .setTitle('Users API')
    .setDescription('API to work with users')
    .setVersion('1.0')
    .addTag('API')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(port, () => console.log(`Server start on port: ${port}`));
}
bootstrap();
