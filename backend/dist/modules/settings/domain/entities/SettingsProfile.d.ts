import { AggregateRoot } from '../../../../shared/domain/AggregateRoot';
import { UserId } from '../../../auth/public';
import { SettingsProfileId } from '../value-objects/SettingsValueObjects';
interface SettingsProfileProps {
    userId: UserId;
    displayName: string;
    avatarUrl?: string;
    bio?: string;
    updatedAt: Date;
}
export declare class SettingsProfile extends AggregateRoot<SettingsProfileProps> {
    private constructor();
    static create(props: SettingsProfileProps, id?: SettingsProfileId): SettingsProfile;
    get userId(): UserId;
    get displayName(): string;
    get avatarUrl(): string | undefined;
    get bio(): string | undefined;
    get updatedAt(): Date;
    updateProfile(props: Partial<SettingsProfileProps>): void;
}
export {};
