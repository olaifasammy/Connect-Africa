import { User } from '../../entities/User';

export class OwnershipPolicy {
  static isOwner(user: User, resourceOwnerId: string): boolean {
    return user.id.toString() === resourceOwnerId;
  }
}
