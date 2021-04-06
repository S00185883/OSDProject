import * as fromList from './list.actions';

describe('loadLists', () => {
  it('should return an action', () => {
    expect(fromList.loadLists().type).toBe('[List] Load Lists');
  });
});
