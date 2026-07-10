import { IRelationshipTypeRepository } from '../repositories/IRelationshipTypeRepository';
export declare class UniqueRelationshipTypePolicy {
    private readonly relationshipTypeRepository;
    constructor(relationshipTypeRepository: IRelationshipTypeRepository);
    validate(name: string): Promise<void>;
}
