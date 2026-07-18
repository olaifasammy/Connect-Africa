import { RegisterProviderCommand } from '../commands/RegisterProviderCommand';
import { IProviderRepository } from '../../domain/repositories/IProviderRepository';
export declare class RegisterProviderHandler {
    private readonly repository;
    constructor(repository: IProviderRepository);
    handle(command: RegisterProviderCommand): Promise<void>;
}
