import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';

@Injectable()
export class MysqlService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    const isDevelopment = this.configService.get('env') === 'development';

    return {
      type: 'mysql',
      host: this.configService.get('DATABASE_URL'),
      port: this.configService.get('DATABASE_PORT'),
      username: this.configService.get('DATABASE_USER_NAME'),
      password: this.configService.get('DATABASE_USER_PASSWORD'),
      database: 'nest_demo',
      // 是否同步数据库
      synchronize: isDevelopment,
      // 是否打印每条日志
      logging: isDevelopment ? 'all' : false,
      // 每次连接是否删除数据
      dropSchema: isDevelopment,
      // 自动加载entity
      autoLoadEntities: true,
    };
  }
}
