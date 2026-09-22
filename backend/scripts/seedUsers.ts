import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.join(__dirname, '../.env') });

import { Pool } from 'pg';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
  console.error('❌ DATABASE_URL environment variable is not defined.');
  process.exit(1);
}

const pool = new Pool({
  connectionString: dbUrl,
});

async function seed() {
  console.log('🌱 Starting Connect Africa user seeding...');

  const usersToSeed = [
    {
      id: uuidv4(),
      email: 'superadmin@connectafrica.org',
      password: 'SuperAdminPassword123!',
      role: 'SUPER_ADMINISTRATOR',
      status: 'ACTIVE',
    },
    {
      id: uuidv4(),
      email: 'editor@connectafrica.org',
      password: 'EditorPassword123!',
      role: 'EDITOR',
      status: 'ACTIVE',
    },
    {
      id: uuidv4(),
      email: 'user@connectafrica.org',
      password: 'UserPassword123!',
      role: 'USER',
      status: 'ACTIVE',
    },
  ];

  try {
    for (const u of usersToSeed) {
      const passwordHash = await bcrypt.hash(u.password, 10);
      const now = new Date();

      const query = `
        INSERT INTO users (
          id,
          email,
          password_hash,
          account_status,
          email_verified_at,
          failed_login_attempts,
          locked_until,
          role,
          mfa_secret,
          terms_accepted_at,
          password_changed_at,
          mfa_recovery_codes
        )
        VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12
        )
        ON CONFLICT (email) DO UPDATE SET
          password_hash = EXCLUDED.password_hash,
          account_status = EXCLUDED.account_status,
          role = EXCLUDED.role,
          email_verified_at = EXCLUDED.email_verified_at
        RETURNING id, email, role;
      `;

      const res = await pool.query(query, [
        u.id,
        u.email,
        passwordHash,
        u.status,
        now,
        0,
        null,
        u.role,
        null,
        now,
        now,
        JSON.stringify([]),
      ]);

      const seededUser = res.rows[0];
      console.log(`✅ Seeded user: ${seededUser.email} [Role: ${seededUser.role}]`);
    }

    console.log('🎉 User seeding completed successfully!');
  } catch (error) {
    console.error('❌ User seeding failed:', error);
  } finally {
    await pool.end();
  }
}

void seed();
