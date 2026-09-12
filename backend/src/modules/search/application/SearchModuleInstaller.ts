import {
  Container,
  injectable,
} from 'inversify';

import {
  provide,
} from 'inversify-binding-decorators';

import {
  IModuleInstaller,
} from '@shared/application/IModuleInstaller';

import {
  MODULE_INSTALLER_SYMBOL,
} from '@shared/application/ModuleInstallerSymbol';

import {
  EventBus,
} from '@shared/infrastructure/queue/EventBus';

import {
  ArticlePublishedEvent,
} from '@modules/article/public';

import {
  EntityCreatedEvent,
} from '@modules/entity/public';

import {
  OntologyCreatedEvent,
} from '@modules/ontology/public';

import {
  RelationshipCreatedEvent,
} from '@modules/relationship/public';

import {
  SourceCreatedEvent,
} from '@modules/source/public';

import {
  UserCreatedEvent,
} from '@modules/auth/public';

import {
  EntityCreatedIndexer,
} from './events/EntityCreatedIndexer';

import {
  ArticlePublishedIndexer,
} from './events/ArticlePublishedIndexer';

import {
  OntologyCreatedIndexer,
} from './events/OntologyCreatedIndexer';

import {
  RelationshipCreatedIndexer,
} from './events/RelationshipCreatedIndexer';

import {
  SourceCreatedIndexer,
} from './events/SourceCreatedIndexer';

import {
  UserCreatedIndexer,
} from './events/UserCreatedIndexer';

@provide(
  MODULE_INSTALLER_SYMBOL,
  true,
)
@injectable()
export class SearchModuleInstaller
  implements IModuleInstaller
{
  async install(
    container: Container,
    eventBus: EventBus,
  ): Promise<void> {
    const entityCreatedIndexer =
      container.get(
        EntityCreatedIndexer,
      );

    await eventBus.subscribe(
      EntityCreatedEvent.name,
      async (
        event: EntityCreatedEvent,
      ) => {
        await entityCreatedIndexer.handle(
          event,
        );
      },
    );

    const articlePublishedIndexer =
      container.get(
        ArticlePublishedIndexer,
      );

    await eventBus.subscribe(
      ArticlePublishedEvent.name,
      async (
        event: ArticlePublishedEvent,
      ) => {
        await articlePublishedIndexer.handle(
          event,
        );
      },
    );

    const ontologyCreatedIndexer =
      container.get(
        OntologyCreatedIndexer,
      );

    await eventBus.subscribe(
      OntologyCreatedEvent.name,
      async (
        event: OntologyCreatedEvent,
      ) => {
        await ontologyCreatedIndexer.handle(
          event,
        );
      },
    );

    const relationshipCreatedIndexer =
      container.get(
        RelationshipCreatedIndexer,
      );

    await eventBus.subscribe(
      RelationshipCreatedEvent.name,
      async (
        event: RelationshipCreatedEvent,
      ) => {
        await relationshipCreatedIndexer.handle(
          event,
        );
      },
    );

    const sourceCreatedIndexer =
      container.get(
        SourceCreatedIndexer,
      );

    await eventBus.subscribe(
      SourceCreatedEvent.name,
      async (
        event: SourceCreatedEvent,
      ) => {
        await sourceCreatedIndexer.handle(
          event,
        );
      },
    );

    const userCreatedIndexer =
      container.get(
        UserCreatedIndexer,
      );

    await eventBus.subscribe(
      UserCreatedEvent.name,
      async (
        event: UserCreatedEvent,
      ) => {
        await userCreatedIndexer.handle(
          event,
        );
      },
    );
  }
}