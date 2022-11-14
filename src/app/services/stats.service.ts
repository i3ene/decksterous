import { Injectable } from '@angular/core';
import { stat } from 'fs';
import { UserLevelStats } from '../models/object/stats.model';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  firstLevelXp: number = 100;
  levelXpScale: number = 1.25;

  user(xp: number): UserLevelStats {
    const stats: UserLevelStats = {
      level: 0,
      current: 0,
      next: this.firstLevelXp,
      progress: 0
    };
    while(xp >= stats.next) {
      stats.level++;
      stats.current = stats.next;
      stats.next *= this.levelXpScale;
      stats.next = Number(stats.next.toFixed(0));
    }
    stats.progress = (xp - stats.current) / (stats.next - stats.current);
    return stats;
  }

}
