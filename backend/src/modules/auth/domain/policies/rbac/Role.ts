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
    Permission.SETTINGS_READ,
    Permission.SETTINGS_WRITE,
    Permission.USER_DATA_READ,
    Permission.USER_DATA_WRITE,
  ]),

  AUTHOR: new Role('AUTHOR', [
    Permission.USER_READ,
    Permission.MFA_MANAGE,
    Permission.MEDIA_READ,
    Permission.MEDIA_WRITE,
    Permission.NOTIFICATION_READ,
    Permission.SETTINGS_READ,
    Permission.USER_DATA_READ,
    Permission.ARTICLE_CREATE,
    Permission.ARTICLE_UPDATE,
    Permission.ENTITY_CREATE,
    Permission.ENTITY_UPDATE,
    Permission.ENTITY_READ,
    Permission.SOURCE_CREATE,
    Permission.SOURCE_READ,
    Permission.SEARCH_READ,
    Permission.SEARCH_WRITE,
  ]),

  EDITOR: new Role('EDITOR', [
    Permission.USER_READ,
    Permission.MFA_MANAGE,
    Permission.MEDIA_READ,
    Permission.MEDIA_WRITE,
    Permission.ENTITY_CREATE,
    Permission.ENTITY_READ,
    Permission.ENTITY_WRITE,
    Permission.ENTITY_UPDATE,
    Permission.ENTITY_PUBLISH,
    Permission.ENTITY_ARCHIVE,
    Permission.ENTITY_RESTORE,
    Permission.ENTITY_VERSION_READ,
    Permission.ENTITY_VERSION_WRITE,
    Permission.ARTICLE_CREATE,
    Permission.ARTICLE_UPDATE,
    Permission.ARTICLE_DELETE,
    Permission.ARTICLE_PUBLISH,
    Permission.SOURCE_CREATE,
    Permission.SOURCE_UPDATE,
    Permission.SOURCE_READ,
    Permission.GRAPH_READ,
    Permission.GRAPH_WRITE,
    Permission.RELATIONSHIP_WRITE,
    Permission.RELATIONSHIP_READ,
    Permission.SEARCH_READ,
    Permission.SEARCH_WRITE,
    Permission.NOTIFICATION_MANAGE,
    Permission.NOTIFICATION_READ,
    Permission.SETTINGS_READ,
  ]),

  REVIEWER: new Role('REVIEWER', [
    Permission.USER_READ,
    Permission.MFA_MANAGE,
    Permission.MEDIA_READ,
    Permission.NOTIFICATION_READ,
    Permission.ARTICLE_APPROVE,
    Permission.ARTICLE_PUBLISH,
    Permission.ARTICLE_UPDATE,
    Permission.ENTITY_READ,
    Permission.ENTITY_PUBLISH,
    Permission.ENTITY_ARCHIVE,
    Permission.AUDIT_READ,
    Permission.SEARCH_READ,
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

  ADMINISTRATOR: new Role(
    'ADMINISTRATOR',
    Object.values(Permission),
  ),

  SUPER_ADMINISTRATOR: new Role(
    'SUPER_ADMINISTRATOR',
    Object.values(Permission),
  ),

  ADMIN: new Role(
    'ADMIN',
    Object.values(Permission),
  ),
};
