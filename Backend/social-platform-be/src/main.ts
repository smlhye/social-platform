import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { APP } from './common/constants/app.constants';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import cookieParser from 'cookie-parser';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(`${APP.PREFIX}/${APP.VERSION}`)

  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });
  app.use(cookieParser());


  await app.listen(process.env.APP_PORT ?? 3000);
}
bootstrap();