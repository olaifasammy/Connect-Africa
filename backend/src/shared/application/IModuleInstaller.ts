import { Container } from 'inversify';
import { EventBus } from '@shared/infrastructure/queue/EventBus';

export interface IModuleInstaller {
  install(container: Container, eventBus: EventBus): Promise<void>;
}
