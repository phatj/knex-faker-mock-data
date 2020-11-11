import { EventEmitter } from 'events';

export class BatchedBuffer extends EventEmitter {
  constructor(iterable, { bufferSize = 500 } = {}) {
    super();

    this._buffer = [];
    this.bufferSize = bufferSize;
    this._iterable = iterable;
  }

  process() {
    for (const item of this._iterable) {
      this._buffer.push(item);

      if (this._buffer.length % this.bufferSize === 0) {
        this._flush();
      }
    }

    if (this._buffer.length > 0) {
      this._flush();
    }
  }

  _flush() {
    this.emit('flush', this._buffer);
    this._buffer = [];
  }
}
