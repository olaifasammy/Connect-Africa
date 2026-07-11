"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresUserProfileRepository = void 0;
const UserProfile_1 = require("../domain/entities/UserProfile");
const UserProfileId_1 = require("../domain/value-objects/UserProfileId");
const UserId_1 = require("../domain/value-objects/UserId");
class PostgresUserProfileRepository {
    pool;
    constructor(pool) {
        this.pool = pool;
    }
    async update(entity) {
        await this.save(entity);
    }
    async findById(id) {
        const res = await this.pool.query('SELECT * FROM user_profiles WHERE id = $1', [id.value]);
        if (res.rows.length === 0)
            return null;
        return UserProfile_1.UserProfile.create({
            userId: UserId_1.UserId.create(res.rows[0].user_id),
            displayName: res.rows[0].display_name,
            avatarUrl: res.rows[0].avatar_url,
            bio: res.rows[0].bio,
            expertise: res.rows[0].expertise,
            researchInterests: res.rows[0].research_interests
        }, UserProfileId_1.UserProfileId.create(res.rows[0].id));
    }
    async save(entity) {
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
exports.PostgresUserProfileRepository = PostgresUserProfileRepository;
//# sourceMappingURL=PostgresUserProfileRepository.js.map