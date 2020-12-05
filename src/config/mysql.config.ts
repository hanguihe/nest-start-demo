import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';

const config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'nest_demo',
  // 是否同步数据库
  synchronize: true,
  // 是否打印每条日志
  logging: 'all',
  // 每次连接是否删除数据
  // dropSchema: true,
  // 自动加载entity
  autoLoadEntities: true,
};

export default config;
