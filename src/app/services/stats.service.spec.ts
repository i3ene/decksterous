import { StatsService } from "./stats.service";

describe('StatsService', () => {
  let service: StatsService;
  beforeEach(() => { service = new StatsService(); });

  it('should get user stats value', () => {
    expect(service.user(1234)).toBeDefined();
  });
});