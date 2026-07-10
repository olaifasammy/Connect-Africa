import { User } from '../../entities/User';
export declare class OwnershipPolicy {
    static isOwner(user: User, resourceOwnerId: string): boolean;
}
