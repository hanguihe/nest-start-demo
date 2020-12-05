import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as compression from 'compression';
import { AppModule } from './app.module';

(async () => {
  const app = await NestFactory.create(AppModule);

  // 开启跨域
  app.enableCors();

  // 开启数据gzip压缩
  app.use(compression());

  // 全局路由前缀
  app.setGlobalPrefix('api');

  // 全局实例化验证管道
  app.useGlobalPipes(new ValidationPipe());

  // 启动
  await app.listen(9093);
  new Logger('APP').debug(`server has been started on http://localhost:9093`);
})();
