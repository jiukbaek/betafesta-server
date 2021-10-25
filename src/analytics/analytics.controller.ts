import { Controller, Get, Inject, Query } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

interface ReportQuery {
  startDate: string;
  endDate: string;
}

@Controller('analytics')
export class AnalyticsController {
  @Inject(AnalyticsService)
  private analyticsService: AnalyticsService;

  @Get('report')
  getReport(@Query() { startDate, endDate }: ReportQuery) {
    return this.analyticsService.getReport(startDate, endDate);
  }
}
