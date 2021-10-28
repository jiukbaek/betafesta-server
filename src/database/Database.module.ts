import { TypeOrmModule } from '@nestjs/typeorm';
import config from './ormconfig';

export const DatabaseModule = TypeOrmModule.forRoot(config);
