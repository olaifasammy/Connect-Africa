import { Relationship } from '../entities/Relationship';
/**
 * Service responsible for ensuring consistency within the knowledge graph after relationship changes.
 */
export declare class GraphConsistencyService {
    ensureConsistency(relationship: Relationship): Promise<void>;
}
