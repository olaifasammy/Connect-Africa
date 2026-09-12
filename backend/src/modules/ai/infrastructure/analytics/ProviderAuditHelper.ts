import { provide } from 'inversify-binding-decorators';
import { injectable, inject } from 'inversify';
import { AuditLogger } from '../../../../shared/infrastructure/logging/AuditLogger';
import { Provider } from '../../domain/entities/Provider';

@provide(ProviderAuditHelper, true)
@injectable()
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
