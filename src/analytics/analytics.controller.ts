import { Controller, Get, Inject, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AnalyticsService } from './analytics.service';

interface ReportQuery {
  startDate: string;
  endDate: string;
}

@UseGuards(JwtAuthGuard)
@Controller('analytics')
export class AnalyticsController {
  @Inject(AnalyticsService)
  private analyticsService: AnalyticsService;

  @Get('report')
  getReport(@Query() { startDate, endDate }: ReportQuery) {
    return this.analyticsService.getReport(startDate, endDate);
  }
}
