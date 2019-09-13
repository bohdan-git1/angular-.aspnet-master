import { AdminVendorModule } from './admin-vendor.module';

describe('AdminVendorModule', () => {
  let adminVendorModule: AdminVendorModule;

  beforeEach(() => {
    adminVendorModule = new AdminVendorModule();
  });

  it('should create an instance', () => {
    expect(adminVendorModule).toBeTruthy();
  });
});
