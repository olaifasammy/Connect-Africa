"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchAggregate = void 0;
const AggregateRoot_1 = require("../../../../shared/domain/AggregateRoot");
const SearchIndexedEvent_1 = require("../events/SearchIndexedEvent");
class SearchAggregate extends AggregateRoot_1.AggregateRoot {
    constructor(props, id) {
        super(props, id || props.id);
        this.validateInvariants(props);
    }
    validateInvariants(document) {
        if (!document.id) {
            throw new Error('Search Document must have an ID');
        }
        if (!document.resourceType || document.resourceType.trim() === '') {
            throw new Error('Search Document must have a resource type');
        }
    }
    static create(document) {
        const aggregate = new SearchAggregate(document);
        aggregate.addDomainEvent(new SearchIndexedEvent_1.SearchIndexedEvent(document.id));
        return aggregate;
    }
    getDocument() {
        return this.props;
    }
}
exports.SearchAggregate = SearchAggregate;
//# sourceMappingURL=SearchAggregate.js.map