import { AdminPmtModule } from './admin-pmt.module';

describe('AdminPmtModule', () => {
  let adminPmtModule: AdminPmtModule;

  beforeEach(() => {
    adminPmtModule = new AdminPmtModule();
  });

  it('should create an instance', () => {
    expect(adminPmtModule).toBeTruthy();
  });
});
