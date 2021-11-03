import { sum } from 'lodash';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BetaAnalyticsDataClient } from '@google-analytics/data';

@Injectable()
export class AnalyticsService {
  @Inject(ConfigService)
  private configService: ConfigService;

  private client: BetaAnalyticsDataClient;

  constructor() {
    this.client = new BetaAnalyticsDataClient();
  }

  async getReport(startDate: string, endDate: string) {
    const [{ rows }] = await this.client.runReport({
      dateRanges: [
        {
          startDate,
          endDate,
        },
      ],
      dimensions: [
        {
          name: 'date',
        },
        {
          name: 'firstUserSource',
        },
        {
          name: 'sessionSource',
        },
      ],
      metrics: [
        {
          name: 'sessions',
        },
        {
          name: 'activeUsers',
        },
      ],
      keepEmptyRows: true,
      orderBys: [
        {
          dimension: {
            dimensionName: 'date',
          },
        },
      ],
      property: `properties/${this.configService.get<string>('PROPERTY_ID')}`,
    });
    const dateVisitor = rows.map(
      ({
        dimensionValues: [{ value: date }],
        metricValues: [{ value: count }],
      }) => ({ date, count }),
    );
    const totalVisitor = sum(
      rows.map(({ metricValues: [{ value }] }) => parseInt(value)),
    );
    const totalRevisitor = sum(
      rows.map(({ metricValues: [, { value }] }) => parseInt(value)),
    );
    const visitPaths = rows.map(
      ({
        dimensionValues: [, { value: path }],
        metricValues: [{ value: count }],
      }) => ({ path, count }),
    );
    return { dateVisitor, totalVisitor, totalRevisitor, visitPaths };
  }
}
