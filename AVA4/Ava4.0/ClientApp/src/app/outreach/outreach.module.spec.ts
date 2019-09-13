import { OutreachModule } from './outreach.module';

describe('OutreachModule', () => {
  let outreachModule: OutreachModule;

  beforeEach(() => {
    outreachModule = new OutreachModule();
  });

  it('should create an instance', () => {
    expect(outreachModule).toBeTruthy();
  });
});
