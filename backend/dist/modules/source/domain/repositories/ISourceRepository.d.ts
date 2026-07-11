import { Source } from '../entities/Source';
import { SourceId } from '../value-objects/SourceValueObjects';
export interface ISourceRepository {
    findById(id: SourceId): Promise<Source | null>;
    save(source: Source): Promise<void>;
    delete(id: SourceId): Promise<void>;
}
