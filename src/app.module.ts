import { Module } from '@nestjs/common';
import { AnalyticsModule } from './analytics/analytics.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [AnalyticsModule, ConfigModule],
})
export class AppModule {}
