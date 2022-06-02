import assert = require("assert");

export function groupBy<T>(arr: T[], mapper: (item: T) => string) {
  const groups: { [key: string]: T[] } = {};

  for (const item of arr) {
    const group = mapper(item);
    groups[group] = groups[group] || [];
    groups[group].push(item);
  }

  return groups;
}

export function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function yesOrNo(isYes: boolean) {
  return isYes ? "Y" : "N";
}

export function asserts(
  asserts: Array<() => void>,
  onAssertError: (e: assert.AssertionError) => void
): boolean[] {
  return asserts.map((assertFunction) => {
    try {
      assertFunction();
    } catch (e) {
      if (e instanceof assert.AssertionError) {
        onAssertError(e);
        return false;
      }
      throw e;
    }
    return true;
  });
}

export function chunk<T>(arr: Array<T>, size: number) {
  const chunks = [];
  for (var i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

export class ChunkProcessor {
  public readonly chunkSize: number;
  private isRateLimitError: (e: any) => boolean;
  private onBatchComplete: (i: number) => void;
  private onRateLimit: (delayMs: number) => void;

  DELAYS = [1000, 3000, 10000, 30000, 60000];

  constructor(options: {
    chunkSize: number;
    isRateLimitError: (e: any) => boolean;
    onBatchComplete: (i: number) => void;
    onRateLimit: (delayMs: number) => void;
  }) {
    Object.assign(this, options);
  }

  private delay(attempt: number) {
    return this.DELAYS[Math.min(attempt, this.DELAYS.length - 1)];
  }

  public async process<T, U>(arr: T[], iter: (item: T) => Promise<U> | U) {
    const processed: U[] = [];
    const chunks = chunk(arr, this.chunkSize);
    var totalDelays = 0,
      attempts = 0,
      i = 1;
    for (var i = 0; i < chunks.length; ) {
      const chunk = chunks[i];
      try {
        const processedChunk = await Promise.all(chunk.map(iter));
        processed.push(...processedChunk);
        this.onBatchComplete(i);
        ++i; // increment when chunk completes successfully
        attempts = 0;
      } catch (e) {
        if (this.isRateLimitError(e)) {
          const delay = this.delay(attempts);
          this.onRateLimit(delay);
          await sleep(delay);
          totalDelays += delay;
          ++attempts;
        } else {
          throw e;
        }
      }
    }

    return processed;
  }
}

export async function processInChunks<T, U>(
  arr: Array<T>,
  size: number,
  func: (chunk: T) => Promise<U> | U,
  onBatchComplete: (i: number) => void,
  isRateLimitError: (e: any) => boolean
) {
  const processed: U[] = [];
  const chunks = chunk(arr, size);
  var totalDelays = 0,
    attempts = 0,
    i = 1;
  const DELAYS = [1000, 3000, 10000, 30000, 60000];
  for (var i = 0; i < chunks.length; ) {
    const chunk = chunks[i];
    try {
      const processedChunk = await Promise.all(chunk.map(func));
      processed.push(...processedChunk);
      onBatchComplete(i);
      ++i; // increment when chunk completes successfully
      attempts = 0;
    } catch (e) {
      if (isRateLimitError(e)) {
        const delay = DELAYS[Math.min(attempts, DELAYS.length - 1)];
        console.warn(`Hitting rate limits: backing off for ${delay}ms`);
        await sleep(delay);
        totalDelays += delay;
        ++attempts;
      } else {
        throw e;
      }
    }
  }

  console.warn(
    `Processed all chunks. Total back off delays of ${totalDelays}ms`
  );

  return processed;
}
