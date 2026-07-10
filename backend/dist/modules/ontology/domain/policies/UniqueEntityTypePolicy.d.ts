import { IEntityTypeRepository } from '../repositories/IEntityTypeRepository';
export declare class UniqueEntityTypePolicy {
    private readonly entityTypeRepository;
    constructor(entityTypeRepository: IEntityTypeRepository);
    validate(name: string): Promise<void>;
}
