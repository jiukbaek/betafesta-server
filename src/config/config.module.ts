import { ConfigModule as NestConfigModule } from '@nestjs/config';

const ENV = process.env.NODE_ENV || 'dev';

export const ConfigModule = NestConfigModule.forRoot({
  envFilePath: `.env.${ENV}`,
});
