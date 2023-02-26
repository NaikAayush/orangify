import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { jsonSerializableMiddleware } from './json-serializable.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(jsonSerializableMiddleware);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
