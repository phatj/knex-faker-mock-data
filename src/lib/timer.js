export class Timer {
  constructor(id) {
    this.id = id;
    this._duration = 0;
  }

  start() {
    this.startedAt = Date.now();
  }

  stop() {
    if (!this.startedAt) {
      throw new Error('Timer has not started yet');
    }
    this._duration = (Date.now() - this.startedAt) / 1000;
  }

  get duration() {
    return this._duration;
  }

  get stringDuration() {
    return `Timer [${this.id}] completed after ${this._duration} seconds`;
  }
}
