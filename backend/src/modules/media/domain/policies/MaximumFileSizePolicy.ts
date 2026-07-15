export class MaximumFileSizePolicy {
  static isSatisfied(size: number, limit: number): boolean {
    return size <= limit;
  }
}
