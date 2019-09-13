import { AdminAnalyticsModule } from './admin-analytics.module';

describe('AdminAnalyticsModule', () => {
  let adminAnalyticsModule: AdminAnalyticsModule;

  beforeEach(() => {
    adminAnalyticsModule = new AdminAnalyticsModule();
  });

  it('should create an instance', () => {
    expect(adminAnalyticsModule).toBeTruthy();
  });
});
