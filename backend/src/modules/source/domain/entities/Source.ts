import { AggregateRoot } from '@shared/domain/AggregateRoot';
import { SourceId, SourceType, Provenance } from '../value-objects/SourceValueObjects';
import { SourceCreatedEvent } from '../events/SourceCreatedEvent';
import { SourceUpdatedEvent } from '../events/SourceUpdatedEvent';
import { SourceDeletedEvent } from '../events/SourceDeletedEvent';

interface SourceProps {
  title: string;
  type: SourceType;
  provenance: Provenance;
  createdAt: Date;
}

export class Source extends AggregateRoot<SourceProps> {
  private constructor(props: SourceProps, id?: SourceId) {
    super(props, id);
  }

  static create(props: SourceProps, id?: SourceId): Source {
    const source = new Source(props, id || new SourceId());
    source.addDomainEvent(new SourceCreatedEvent(source.id));
    return source;
  }

  public update(title: string, provenance: Provenance): void {
    this.props.title = title;
    this.props.provenance = provenance;
    this.addDomainEvent(new SourceUpdatedEvent(this.id));
  }

  public delete(): void {
    this.addDomainEvent(new SourceDeletedEvent(this.id));
  }

  get title(): string { return this.props.title; }
  get type(): SourceType { return this.props.type; }
  get provenance(): Provenance { return this.props.provenance; }
  get createdAt(): Date { return this.props.createdAt; }
}
