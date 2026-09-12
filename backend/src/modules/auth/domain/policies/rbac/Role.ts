import { Permission } from './Permissions';

export class Role {
  constructor(
    public readonly name: string,
    public readonly permissions: Permission[],
  ) {}

  hasPermission(
    permission: Permission,
  ): boolean {
    return this.permissions.includes(permission);
  }
}

export const Roles = {
  USER: new Role('USER', [
    Permission.USER_READ,
    Permission.MFA_MANAGE,
    Permission.MEDIA_READ,
    Permission.NOTIFICATION_READ,
  ]),

  EDITOR: new Role('EDITOR', [
    Permission.USER_READ,
    Permission.MFA_MANAGE,
    Permission.MEDIA_READ,
    Permission.MEDIA_WRITE,
    Permission.ENTITY_CREATE,
    Permission.ENTITY_READ,
    Permission.ENTITY_WRITE,
    Permission.ENTITY_VERSION_READ,
    Permission.ENTITY_VERSION_WRITE,
    Permission.ARTICLE_CREATE,
    Permission.ARTICLE_UPDATE,
    Permission.ARTICLE_DELETE,
    Permission.GRAPH_READ,
    Permission.GRAPH_WRITE,
    Permission.RELATIONSHIP_WRITE,
    Permission.RELATIONSHIP_READ,
    Permission.SEARCH_READ,
    Permission.SEARCH_WRITE,
    Permission.NOTIFICATION_MANAGE,
    Permission.NOTIFICATION_READ,
  ]),

  MODERATOR: new Role('MODERATOR', [
    Permission.USER_READ,
    Permission.USER_WRITE,
    Permission.MFA_MANAGE,
    Permission.SESSION_MANAGE,
    Permission.ARTICLE_PUBLISH,
    Permission.ARTICLE_APPROVE,
    Permission.ENTITY_READ,
    Permission.ENTITY_WRITE,
    Permission.GRAPH_READ,
    Permission.AUDIT_READ,
    Permission.SEARCH_READ,
    Permission.MEDIA_READ,
    Permission.NOTIFICATION_READ,
  ]),

  ADMIN: new Role(
    'ADMIN',
    Object.values(Permission),
  ),
};
