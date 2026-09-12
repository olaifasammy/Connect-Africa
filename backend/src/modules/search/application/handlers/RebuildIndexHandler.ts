import { injectable, inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { SearchProvider } from '../../infrastructure/search/SearchProvider';

export class RebuildIndexCommand {
  constructor(public readonly name: string) {}
}

@provide(RebuildIndexHandler, true)
@injectable()
export class RebuildIndexHandler {
  constructor(@inject('SearchProvider') private readonly provider: SearchProvider) {}

  async handle(command: RebuildIndexCommand): Promise<void> {
    await this.provider.rebuildIndex(command.name);
  }
}
