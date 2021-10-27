import { Module } from '@nestjs/common';
import { AnalyticsModule } from './analytics/analytics.module';
import { BoardModule } from './board/board.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from './config/config.module';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/public',
    }),
    AnalyticsModule,
    BoardModule,
    ConfigModule,
  ],
})
export class AppModule {}
