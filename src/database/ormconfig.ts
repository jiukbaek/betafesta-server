import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

const config: TypeOrmModuleOptions = {
  autoLoadEntities: true,
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/migrations',
    subscribersDir: 'src/subscribers',
  },
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'betafesta',
  username: 'ubuntu',
  password: 'ubuntu',
  entities: [join(__dirname, '../**/*.entity.{ts,js}')],
  migrations: [join(__dirname, '../migrations/*.{ts,js}')],
  keepConnectionAlive: true,
  synchronize: false,
};

export default config;
