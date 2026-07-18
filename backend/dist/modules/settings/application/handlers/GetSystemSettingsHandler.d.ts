import { ISettingsRepository } from '../../domain/repositories/ISettingsRepository';
import { SystemSettingsResponseDto } from '../dto/SettingsDTOs';
export declare class GetSystemSettingsHandler {
    private readonly repository;
    constructor(repository: ISettingsRepository);
    handle(): Promise<SystemSettingsResponseDto | null>;
}
