import { AuditLogger } from '../../../../shared/infrastructure/logging/AuditLogger';
import { Provider } from '../../domain/entities/Provider';

export class ProviderAuditHelper {
  static logProviderChange(provider: Provider, action: 'ADD' | 'REMOVE' | 'ENABLE' | 'DISABLE'): void {
    AuditLogger.log({
      user: 'admin',
      action: `PROVIDER_${action}`,
      resource: `Provider:${provider.id}`,
      status: 'SUCCESS'
    });
  }
}
