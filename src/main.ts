import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './config/app-config.service';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config: AppConfigService = app.get(AppConfigService);

  await app.listen(config.port).then(() => {
    Logger.log(`App started. Port ${config.port}`, 'NestApplication');
  });
}

bootstrap();
