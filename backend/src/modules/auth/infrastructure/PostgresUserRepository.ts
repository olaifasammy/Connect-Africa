import { Pool } from 'pg';
import { IUserRepository } from '@modules/auth/domain/repositories/UserRepository';
import { User } from '@modules/auth/domain/entities/User';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { Email } from '@modules/auth/domain/value-objects/Email';
import { PasswordHash } from '@modules/auth/domain/value-objects/PasswordHash';

export class PostgresUserRepository implements IUserRepository {
  constructor(private pool: Pool) {}

  async save(user: User): Promise<void> {
    const query = `
      INSERT INTO users (id, email, password_hash, is_active)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email, password_hash = EXCLUDED.password_hash, is_active = EXCLUDED.is_active
    `;
    await this.pool.query(query, [user.id.toString(), user.email.value, user.passwordHash.value, user.isActive]);
  }

  async findById(id: UniqueEntityId): Promise<User | null> {
    const res = await this.pool.query('SELECT * FROM users WHERE id = $1', [id.toString()]);
    if (res.rows.length === 0) return null;
    return new User(
      { 
        email: new Email(res.rows[0].email), 
        passwordHash: new PasswordHash(res.rows[0].password_hash),
        isActive: res.rows[0].is_active || false
      },
      new UniqueEntityId(res.rows[0].id)
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const res = await this.pool.query('SELECT * FROM users WHERE email = $1', [email.toLowerCase()]);
    if (res.rows.length === 0) return null;
    return new User(
      { 
        email: new Email(res.rows[0].email), 
        passwordHash: new PasswordHash(res.rows[0].password_hash),
        isActive: res.rows[0].is_active || false
      },
      new UniqueEntityId(res.rows[0].id)
    );
  }

  async findAll(): Promise<User[]> {
    const res = await this.pool.query('SELECT * FROM users');
    return res.rows.map(row => new User(
      { 
        email: new Email(row.email), 
        passwordHash: new PasswordHash(row.password_hash),
        isActive: row.is_active || false
      },
      new UniqueEntityId(row.id)
    ));
  }

  async search(term: string): Promise<User[]> {
    const res = await this.pool.query('SELECT * FROM users WHERE email LIKE $1', [`%${term}%`]);
    return res.rows.map(row => new User(
      { 
        email: new Email(row.email), 
        passwordHash: new PasswordHash(row.password_hash),
        isActive: row.is_active || false
      },
      new UniqueEntityId(row.id)
    ));
  }
}
