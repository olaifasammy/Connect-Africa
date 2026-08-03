export class SensitiveDataMaskingPolicy {
  static mask(data: any): any {
    if (typeof data !== 'object' || data === null) return data;
    const masked = { ...data };
    const sensitiveFields = ['password', 'token', 'secret'];
    for (const field of sensitiveFields) {
      if (masked[field]) masked[field] = '****';
    }
    return masked;
  }
}
