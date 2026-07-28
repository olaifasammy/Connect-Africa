import { Pool } from 'pg';
import { IUserProfileRepository } from '../domain/repositories/IUserProfileRepository';
import { UserProfile } from '../domain/entities/UserProfile';
import { UserProfileId } from '../domain/value-objects/UserProfileId';
import { UserId } from '../domain/value-objects/UserId';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class PostgresUserProfileRepository implements IUserProfileRepository {
  constructor(private pool: Pool) {}

  async update(entity: UserProfile): Promise<void> {
    await this.save(entity);
  }

  async findById(id: UserProfileId): Promise<UserProfile | null> {
    const res = await this.pool.query('SELECT * FROM user_profiles WHERE id = $1', [id.value]);
    if (res.rows.length === 0) return null;
    return UserProfile.create({
        userId: UserId.create(res.rows[0].user_id),
        displayName: res.rows[0].display_name,
        avatarUrl: res.rows[0].avatar_url,
        bio: res.rows[0].bio,
        expertise: res.rows[0].expertise,
        researchInterests: res.rows[0].research_interests
    }, UserProfileId.create(res.rows[0].id));
  }

  async save(entity: UserProfile): Promise<void> {
    const query = `
      INSERT INTO user_profiles (id, user_id, display_name, avatar_url, bio, expertise, research_interests)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      ON CONFLICT (id) DO UPDATE SET 
        display_name = EXCLUDED.display_name,
        avatar_url = EXCLUDED.avatar_url,
        bio = EXCLUDED.bio,
        expertise = EXCLUDED.expertise,
        research_interests = EXCLUDED.research_interests;
    `;
    await this.pool.query(query, [
      entity.id.toString(),
      entity.userId.value,
      entity.displayName,
      entity.avatarUrl,
      entity.bio,
      entity.expertise,
      entity.researchInterests
    ]);
  }
}
