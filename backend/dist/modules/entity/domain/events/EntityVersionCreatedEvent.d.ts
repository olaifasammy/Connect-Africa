import { DomainEvent } from '../../../../shared/domain/DomainEvent';
import { EntityVersion } from '../entities/EntityVersion';
export declare class EntityVersionCreatedEvent extends DomainEvent {
    readonly version: EntityVersion;
    constructor(version: EntityVersion);
}
