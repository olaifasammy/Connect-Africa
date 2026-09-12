import { Pool } from 'pg';

import {
  IUserProfileRepository,
} from '../domain/repositories/IUserProfileRepository';

import {
  UserProfile,
} from '../domain/entities/UserProfile';

import {
  UserProfileId,
} from '../domain/value-objects/UserProfileId';

import {
  UserId,
} from '../domain/value-objects/UserId';

import {
  provide,
} from 'inversify-binding-decorators';

import {
  injectable,
} from 'inversify';

@provide(
  'IUserProfileRepository',
  true,
)
@injectable()
export class PostgresUserProfileRepository
  implements IUserProfileRepository
{
  constructor(
    private readonly pool: Pool,
  ) {}

  async update(
    entity: UserProfile,
  ): Promise<void> {
    await this.save(entity);
  }

  async findById(
    id: UserProfileId,
  ): Promise<UserProfile | null> {
    const result =
      await this.pool.query(
        `
          SELECT
            id,
            user_id,
            display_name,
            avatar_url,
            cover_image_url,
            bio,
            website,
            social_links,
            country,
            languages,
            expertise,
            research_interests
          FROM user_profiles
          WHERE id = $1
        `,
        [id.value],
      );

    if (
      result.rows.length === 0
    ) {
      return null;
    }

    return this.toDomain(
      result.rows[0],
    );
  }

  async findByUserId(
    userId: UserId,
  ): Promise<UserProfile | null> {
    const result =
      await this.pool.query(
        `
          SELECT
            id,
            user_id,
            display_name,
            avatar_url,
            cover_image_url,
            bio,
            website,
            social_links,
            country,
            languages,
            expertise,
            research_interests
          FROM user_profiles
          WHERE user_id = $1
        `,
        [userId.value],
      );

    if (
      result.rows.length === 0
    ) {
      return null;
    }

    return this.toDomain(
      result.rows[0],
    );
  }

  async save(
    entity: UserProfile,
  ): Promise<void> {
    const query = `
      INSERT INTO user_profiles (
        id,
        user_id,
        display_name,
        avatar_url,
        cover_image_url,
        bio,
        website,
        social_links,
        country,
        languages,
        expertise,
        research_interests
      )
      VALUES (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7,
        $8,
        $9,
        $10,
        $11,
        $12
      )
      ON CONFLICT (id) DO UPDATE SET
        display_name = EXCLUDED.display_name,
        avatar_url = EXCLUDED.avatar_url,
        cover_image_url = EXCLUDED.cover_image_url,
        bio = EXCLUDED.bio,
        website = EXCLUDED.website,
        social_links = EXCLUDED.social_links,
        country = EXCLUDED.country,
        languages = EXCLUDED.languages,
        expertise = EXCLUDED.expertise,
        research_interests = EXCLUDED.research_interests
    `;

    await this.pool.query(
      query,
      [
        entity.id.toString(),
        entity.userId.value,
        entity.displayName,
        entity.avatarUrl ?? null,
        entity.coverImageUrl ?? null,
        entity.bio ?? null,
        entity.website ?? null,
        entity.socialLinks ?? null,
        entity.country ?? null,
        entity.languages ?? null,
        entity.expertise ?? null,
        entity.researchInterests ?? null,
      ],
    );
  }

  private toDomain(
    row: any,
  ): UserProfile {
    return UserProfile.create(
      {
        userId:
          UserId.create(
            row.user_id,
          ),

        displayName:
          row.display_name,

        avatarUrl:
          row.avatar_url ??
          undefined,

        coverImageUrl:
          row.cover_image_url ??
          undefined,

        bio:
          row.bio ??
          undefined,

        website:
          row.website ??
          undefined,

        socialLinks:
          row.social_links ??
          undefined,

        country:
          row.country ??
          undefined,

        languages:
          row.languages ??
          undefined,

        expertise:
          row.expertise ??
          undefined,

        researchInterests:
          row.research_interests ??
          undefined,
      },
      UserProfileId.create(
        row.id,
      ),
    );
  }
}
