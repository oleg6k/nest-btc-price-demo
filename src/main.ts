import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config: ConfigService = app.get(ConfigService);

  await app.listen(config.port).then(() => {
    Logger.log(`App started. Port ${config.port}`, 'NestApplication');
  });
}
bootstrap();
