import { injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { PostgresProvider } from '@shared/infrastructure/database/PostgresProvider';

@provide(MediaPermissionService, true)
@injectable()
export class MediaPermissionService {
  constructor(private readonly postgresProvider: PostgresProvider) {}

  /**
   * Verifies if a user has permission to read or manipulate a media asset.
   */
  async canAccess(userId: UniqueEntityId, mediaId: UniqueEntityId): Promise<boolean> {
    const query = `
      SELECT id, uploader_id, is_public
      FROM media
      WHERE id = $1
      LIMIT 1;
    `;

    const result = await this.postgresProvider.query(query, [mediaId.toString()]);

    if (result.rows.length === 0) {
      return false;
    }

    const row = result.rows[0];

    // Public media is accessible to all authenticated users
    if (row.is_public) {
      return true;
    }

    // Direct owner check
    if (row.uploader_id === userId.toString()) {
      return true;
    }

    // Admin role check
    const adminCheckQuery = `
      SELECT role FROM users WHERE id = $1 AND role IN ('ADMINISTRATOR', 'SUPER_ADMINISTRATOR');
    `;
    const adminResult = await this.postgresProvider.query(adminCheckQuery, [userId.toString()]);

    return adminResult.rows.length > 0;
  }
}
