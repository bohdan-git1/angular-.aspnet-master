import { SearchmoduleModule } from './searchmodule.module';

describe('SearchmoduleModule', () => {
  let searchmoduleModule: SearchmoduleModule;

  beforeEach(() => {
    searchmoduleModule = new SearchmoduleModule();
  });

  it('should create an instance', () => {
    expect(searchmoduleModule).toBeTruthy();
  });
});
