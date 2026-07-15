import { AuditLogger } from '@shared/infrastructure/logging/AuditLogger';

export function AuditLog(action: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      try {
        const result = await originalMethod.apply(this, args);
        AuditLogger.log({
          user: 'system',
          action: action,
          resource: 'unknown',
          status: 'SUCCESS',
        });
        return result;
      } catch (error) {
        AuditLogger.log({
          user: 'system',
          action: action,
          resource: 'unknown',
          status: 'FAILURE',
        });
        throw error;
      }
    };
    return descriptor;
  };
}
