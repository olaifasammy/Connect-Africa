import { ISettingsRepository } from '../../domain/repositories/ISettingsRepository';
import { SettingsResponseDto } from '../dto/SettingsDTOs';
export declare class GetSettingsHandler {
    private readonly repository;
    constructor(repository: ISettingsRepository);
    handle(userId: string): Promise<SettingsResponseDto | null>;
}
