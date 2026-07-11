import { AggregateRoot } from '../../../../shared/domain/AggregateRoot';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
import { SearchDocument } from '../models/SearchDocument';
export declare class SearchAggregate extends AggregateRoot<SearchDocument> {
    constructor(props: SearchDocument, id?: UniqueEntityId);
    private validateInvariants;
    static create(document: SearchDocument): SearchAggregate;
    getDocument(): SearchDocument;
}
