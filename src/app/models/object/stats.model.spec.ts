import { UserLevelStats } from "./stats.model";

describe('UserLevelStats', () => {
  let model: UserLevelStats;
  beforeEach(() => { model = new UserLevelStats(); });

  it('should create', () => {
    expect(model).toBeDefined();
  });
});