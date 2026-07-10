"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresUserRepository = void 0;
const User_1 = require("../../auth/domain/entities/User");
const UniqueEntityId_1 = require("../../../shared/domain/UniqueEntityId");
const Email_1 = require("../../auth/domain/value-objects/Email");
const PasswordHash_1 = require("../../auth/domain/value-objects/PasswordHash");
class PostgresUserRepository {
    pool;
    constructor(pool) {
        this.pool = pool;
    }
    async save(user) {
        const query = `
      INSERT INTO users (id, email, password_hash, is_active)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email, password_hash = EXCLUDED.password_hash, is_active = EXCLUDED.is_active
    `;
        await this.pool.query(query, [user.id.toString(), user.email.value, user.passwordHash.value, user.isActive]);
    }
    async findById(id) {
        const res = await this.pool.query('SELECT * FROM users WHERE id = $1', [id.toString()]);
        if (res.rows.length === 0)
            return null;
        return new User_1.User({
            email: new Email_1.Email(res.rows[0].email),
            passwordHash: new PasswordHash_1.PasswordHash(res.rows[0].password_hash),
            isActive: res.rows[0].is_active || false
        }, new UniqueEntityId_1.UniqueEntityId(res.rows[0].id));
    }
    async findByEmail(email) {
        const res = await this.pool.query('SELECT * FROM users WHERE email = $1', [email.toLowerCase()]);
        if (res.rows.length === 0)
            return null;
        return new User_1.User({
            email: new Email_1.Email(res.rows[0].email),
            passwordHash: new PasswordHash_1.PasswordHash(res.rows[0].password_hash),
            isActive: res.rows[0].is_active || false
        }, new UniqueEntityId_1.UniqueEntityId(res.rows[0].id));
    }
    async findAll() {
        const res = await this.pool.query('SELECT * FROM users');
        return res.rows.map(row => new User_1.User({
            email: new Email_1.Email(row.email),
            passwordHash: new PasswordHash_1.PasswordHash(row.password_hash),
            isActive: row.is_active || false
        }, new UniqueEntityId_1.UniqueEntityId(row.id)));
    }
    async search(term) {
        const res = await this.pool.query('SELECT * FROM users WHERE email LIKE $1', [`%${term}%`]);
        return res.rows.map(row => new User_1.User({
            email: new Email_1.Email(row.email),
            passwordHash: new PasswordHash_1.PasswordHash(row.password_hash),
            isActive: row.is_active || false
        }, new UniqueEntityId_1.UniqueEntityId(row.id)));
    }
}
exports.PostgresUserRepository = PostgresUserRepository;
//# sourceMappingURL=PostgresUserRepository.js.map