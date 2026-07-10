import { IEntityRepository } from '../../entity/domain/repositories/IEntityRepository';
import { Entity } from '../../entity/domain/entities/Entity';
import { EntityId } from '../../entity/domain/value-objects/EntityId';
import { Pool } from 'pg';
export declare class PostgresEntityRepository implements IEntityRepository {
    private readonly pool;
    constructor(pool: Pool);
    save(entity: Entity): Promise<void>;
    findById(id: EntityId): Promise<Entity | null>;
    existsBySlug(slug: string): Promise<boolean>;
    findBySlug(slug: string): Promise<Entity | null>;
    findByIdentifier(identifier: string): Promise<Entity | null>;
    findAll(page: number, limit: number): Promise<Entity[]>;
    search(term: string): Promise<Entity[]>;
    delete(id: EntityId): Promise<void>;
}
