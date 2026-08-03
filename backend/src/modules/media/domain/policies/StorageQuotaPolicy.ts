export class StorageQuotaPolicy {
  static isWithinQuota(currentUsage: number, fileSize: number, quota: number): boolean {
    return currentUsage + fileSize <= quota;
  }
}
