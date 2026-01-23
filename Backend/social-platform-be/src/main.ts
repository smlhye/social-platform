import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { APP } from './common/constants/app.constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(`${APP.PREFIX}/${APP.VERSION}`)

  await app.listen(process.env.APP_PORT ?? 3000);
}
bootstrap();