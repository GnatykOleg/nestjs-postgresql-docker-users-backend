import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Add port
  const configService = app.get(ConfigService);
  const port = configService.get('port');

  await app.listen(port, () => console.log(`Server start on port: ${port}`));
}
bootstrap();
