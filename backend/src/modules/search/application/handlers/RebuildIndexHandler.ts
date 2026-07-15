import { injectable, inject } from 'inversify';
import { SearchProvider } from '../../infrastructure/search/SearchProvider';

export class RebuildIndexCommand {
  constructor(public readonly name: string) {}
}

@injectable()
export class RebuildIndexHandler {
  constructor(@inject(SearchProvider) private readonly provider: SearchProvider) {}

  async handle(command: RebuildIndexCommand): Promise<void> {
    await this.provider.rebuildIndex(command.name);
  }
}
