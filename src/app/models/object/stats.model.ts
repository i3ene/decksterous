export class UserLevelStats {
  xp: number;
  level: number;
  current: number;
  next: number;
  progress: number;

  constructor() {
    this.xp = 0;
    this.level = 0;
    this.current = 0;
    this.next = 0;
    this.progress = 0;
  }

  get levelCurrent(): number {
    return this.xp - this.current;
  }

  get levelNext(): number {
    return this.next - this.current;
  }
}

