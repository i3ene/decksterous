import { Injectable } from '@angular/core';
import { UserLevelStats } from '../models/object/stats.model';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  firstLevelXp: number = 100;
  levelXpScale: number = 0.1;

  user(xp: number): UserLevelStats {
    const stats: UserLevelStats = new UserLevelStats();
    stats.xp = xp;
    stats.next = this.firstLevelXp;
    while(stats.xp >= stats.next) {
      stats.level++;
      let last = stats.next - stats.current;
      stats.current = stats.next;
      stats.next += last + (this.firstLevelXp * this.levelXpScale);
      stats.next = Number(stats.next.toFixed(0));
    }
    stats.progress = (stats.xp - stats.current) / (stats.next - stats.current);
    return stats;
  }

}
