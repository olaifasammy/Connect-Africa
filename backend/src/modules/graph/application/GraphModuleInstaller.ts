import { Container } from 'inversify';
import { injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';

import {
  IModuleInstaller,
} from '@shared/application/IModuleInstaller';

import {
  EventBus,
} from '@shared/infrastructure/queue/EventBus';

import {
  MODULE_INSTALLER_SYMBOL,
} from '@shared/application/ModuleInstallerSymbol';

import {
  RelationshipCreatedHandler,
} from '@modules/graph/application/events/RelationshipCreatedHandler';

import {
  RelationshipUpdatedHandler,
} from '@modules/graph/application/events/RelationshipUpdatedHandler';

import {
  RelationshipDeletedHandler,
} from '@modules/graph/application/events/RelationshipDeletedHandler';

import {
  RelationshipCreatedEvent,
  RelationshipUpdatedEvent,
  RelationshipDeletedEvent,
} from '@modules/relationship/public';

@provide(
  MODULE_INSTALLER_SYMBOL,
  true,
)
@injectable()
export class GraphModuleInstaller
  implements IModuleInstaller
{
  async install(
    container: Container,
    eventBus: EventBus,
  ): Promise<void> {
    const relationshipCreatedHandler =
      container.get(
        RelationshipCreatedHandler,
      );

    await eventBus.subscribe(
      RelationshipCreatedEvent.name,
      async (
        event: RelationshipCreatedEvent,
      ) => {
        await relationshipCreatedHandler.handle(
          event,
        );
      },
    );

    const relationshipUpdatedHandler =
      container.get(
        RelationshipUpdatedHandler,
      );

    await eventBus.subscribe(
      RelationshipUpdatedEvent.name,
      async (
        event: RelationshipUpdatedEvent,
      ) => {
        await relationshipUpdatedHandler.handle(
          event,
        );
      },
    );

    const relationshipDeletedHandler =
      container.get(
        RelationshipDeletedHandler,
      );

    await eventBus.subscribe(
      RelationshipDeletedEvent.name,
      async (
        event: RelationshipDeletedEvent,
      ) => {
        await relationshipDeletedHandler.handle(
          event,
        );
      },
    );
  }
}