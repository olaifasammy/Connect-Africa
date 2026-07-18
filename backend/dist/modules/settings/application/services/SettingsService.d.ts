import { ISettingsRepository } from '../../domain/repositories/ISettingsRepository';
export declare class SettingsService {
    private readonly repository;
    constructor(repository: ISettingsRepository);
    validateSettings(userId: string): Promise<boolean>;
}
