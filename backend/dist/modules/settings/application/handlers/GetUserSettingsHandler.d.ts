import { ISettingsRepository } from '../../domain/repositories/ISettingsRepository';
import { UserSettingsResponseDto } from '../dto/SettingsDTOs';
export declare class GetUserSettingsHandler {
    private readonly repository;
    constructor(repository: ISettingsRepository);
    handle(userId: string): Promise<UserSettingsResponseDto | null>;
}
