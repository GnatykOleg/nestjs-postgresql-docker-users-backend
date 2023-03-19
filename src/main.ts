import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(4000, () => console.log(`Server start on port: ${4000}`));
}
bootstrap();
