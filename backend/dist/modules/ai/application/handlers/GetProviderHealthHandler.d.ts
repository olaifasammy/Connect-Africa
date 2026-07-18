import { IProviderRepository } from '../../domain/repositories/IProviderRepository';
import { GetProviderHealthQuery } from '../queries/GetProviderHealthQuery';
export declare class GetProviderHealthHandler {
    private readonly providerRepository;
    constructor(providerRepository: IProviderRepository);
    handle(query: GetProviderHealthQuery): Promise<{
        providerId: string;
        name: string;
        status: string;
    }>;
}
