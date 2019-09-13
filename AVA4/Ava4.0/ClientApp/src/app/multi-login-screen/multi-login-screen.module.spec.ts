import { MultiLoginScreenModule } from './multi-login-screen.module';

describe('MultiLoginScreenModule', () => {
  let multiLoginScreenModule: MultiLoginScreenModule;

  beforeEach(() => {
    multiLoginScreenModule = new MultiLoginScreenModule();
  });

  it('should create an instance', () => {
    expect(multiLoginScreenModule).toBeTruthy();
  });
});
