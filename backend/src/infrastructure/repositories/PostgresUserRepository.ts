import { Pool } from 'pg';
import { IUserRepository } from '@domain/auth/repositories/UserRepository';
import { User } from '@domain/auth/entities/User';
import { UniqueEntityId } from '@domain/shared/UniqueEntityId';
import { Email } from '@domain/auth/value-objects/Email';
import { PasswordHash } from '@domain/auth/value-objects/PasswordHash';

export class PostgresUserRepository implements IUserRepository {
  constructor(private pool: Pool) {}

  async save(user: User): Promise<void> {
    const query = `
      INSERT INTO users (id, email, password_hash)
      VALUES ($1, $2, $3)
      ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email, password_hash = EXCLUDED.password_hash
    `;
    await this.pool.query(query, [user.id.toString(), user.email.value, user.passwordHash.value]);
  }

  async findById(id: UniqueEntityId): Promise<User | null> {
    const res = await this.pool.query('SELECT * FROM users WHERE id = $1', [id.toString()]);
    if (res.rows.length === 0) return null;
    return new User(
      { email: new Email(res.rows[0].email), passwordHash: new PasswordHash(res.rows[0].password_hash) },
      new UniqueEntityId(res.rows[0].id)
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const res = await this.pool.query('SELECT * FROM users WHERE email = $1', [email.toLowerCase()]);
    if (res.rows.length === 0) return null;
    return new User(
      { email: new Email(res.rows[0].email), passwordHash: new PasswordHash(res.rows[0].password_hash) },
      new UniqueEntityId(res.rows[0].id)
    );
  }
}
