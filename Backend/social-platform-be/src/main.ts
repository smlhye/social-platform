import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { APP } from './common/constants/app.constants';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(`${APP.PREFIX}/${APP.VERSION}`)

  app.useGlobalInterceptors(new TransformInterceptor());
  
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });



  await app.listen(process.env.APP_PORT ?? 3000);
}
bootstrap();