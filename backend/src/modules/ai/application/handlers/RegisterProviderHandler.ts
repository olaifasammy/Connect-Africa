import { RegisterProviderCommand } from '../commands/RegisterProviderCommand';
import { IProviderRepository } from '../../domain/repositories/IProviderRepository';
import { Provider } from '../../domain/entities/Provider';

export class RegisterProviderHandler {
  constructor(private readonly repository: IProviderRepository) {}
  async handle(command: RegisterProviderCommand): Promise<void> {
    const provider = new Provider(Math.random().toString(), command.name, true, command.priority);
    await this.repository.save(provider);
  }
}
