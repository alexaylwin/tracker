import { Tracker2Page } from './app.po';

describe('tracker2 App', () => {
  let page: Tracker2Page;

  beforeEach(() => {
    page = new Tracker2Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
