import { IOntologyRepository } from '../repositories/IOntologyRepository';
export declare class UniqueOntologyPolicy {
    private readonly ontologyRepository;
    constructor(ontologyRepository: IOntologyRepository);
    validate(name: string): Promise<void>;
}
