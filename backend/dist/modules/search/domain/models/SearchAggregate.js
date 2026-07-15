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
        if (!document.id || document.id.toString().trim() === '') {
            throw new Error('Search Document must have a valid ID');
        }
        if (!document.resourceType || document.resourceType.trim() === '') {
            throw new Error('Search Document must have a valid resource type');
        }
        if (!document.resourceId || document.resourceId.toString().trim() === '') {
            throw new Error('Search Document must have a valid resource ID');
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