import { AggregateRoot } from '../../../../shared/domain/AggregateRoot';
import { SourceId, SourceType, Provenance } from '../value-objects/SourceValueObjects';
interface SourceProps {
    title: string;
    type: SourceType;
    provenance: Provenance;
    createdAt: Date;
}
export declare class Source extends AggregateRoot<SourceProps> {
    private constructor();
    static create(props: SourceProps, id?: SourceId): Source;
    update(title: string, provenance: Provenance): void;
    delete(): void;
    get title(): string;
    get type(): SourceType;
    get provenance(): Provenance;
    get createdAt(): Date;
}
export {};
