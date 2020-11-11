import { EventEmitter } from 'events';

export class BatchedBuffer extends EventEmitter {
  constructor(iterable, { bufferSize = 500 } = {}) {
    super();

    this._buffer = [];
    this.bufferSize = bufferSize;
    this._iterable = iterable;
  }

  async process(onFlush) {
    this._onFlush = onFlush;

    for (const item of this._iterable) {
      this._buffer.push(item);

      if (this._buffer.length % this.bufferSize === 0) {
        await this._flush();
      }
    }

    if (this._buffer.length > 0) {
      await this._flush();
    }

    this._onFlush = null;
  }

  async _flush() {
    await this._onFlush(this._buffer);
    this._buffer = [];
  }
}
