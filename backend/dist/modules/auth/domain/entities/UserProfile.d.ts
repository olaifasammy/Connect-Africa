import { AggregateRoot } from '../../../../shared/domain/AggregateRoot';
import { UserProfileId } from '../value-objects/UserProfileId';
import { UserId } from '../value-objects/UserId';
export interface UserProfileProps {
    userId: UserId;
    displayName: string;
    bio?: string;
    avatarUrl?: string;
    coverImageUrl?: string;
    website?: string;
    socialLinks?: string[];
    country?: string;
    languages?: string[];
    expertise?: string[];
    researchInterests?: string[];
}
export declare class UserProfile extends AggregateRoot<UserProfileProps> {
    private constructor();
    static create(props: UserProfileProps, id?: UserProfileId): UserProfile;
    get userId(): UserId;
    get bio(): string | undefined;
    get avatarUrl(): string | undefined;
    get displayName(): string;
    get coverImageUrl(): string | undefined;
    get website(): string | undefined;
    get socialLinks(): string[] | undefined;
    get country(): string | undefined;
    get languages(): string[] | undefined;
    get expertise(): string[] | undefined;
    get researchInterests(): string[] | undefined;
    updateProfile(props: Partial<UserProfileProps>): void;
}
