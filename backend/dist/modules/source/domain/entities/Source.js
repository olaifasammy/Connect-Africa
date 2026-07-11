"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Source = void 0;
const AggregateRoot_1 = require("../../../../shared/domain/AggregateRoot");
const SourceValueObjects_1 = require("../value-objects/SourceValueObjects");
const SourceCreatedEvent_1 = require("../events/SourceCreatedEvent");
const SourceUpdatedEvent_1 = require("../events/SourceUpdatedEvent");
const SourceDeletedEvent_1 = require("../events/SourceDeletedEvent");
class Source extends AggregateRoot_1.AggregateRoot {
    constructor(props, id) {
        super(props, id);
    }
    static create(props, id) {
        const source = new Source(props, id || new SourceValueObjects_1.SourceId());
        source.addDomainEvent(new SourceCreatedEvent_1.SourceCreatedEvent(source.id));
        return source;
    }
    update(title, provenance) {
        this.props.title = title;
        this.props.provenance = provenance;
        this.addDomainEvent(new SourceUpdatedEvent_1.SourceUpdatedEvent(this.id));
    }
    delete() {
        this.addDomainEvent(new SourceDeletedEvent_1.SourceDeletedEvent(this.id));
    }
    get title() { return this.props.title; }
    get type() { return this.props.type; }
    get provenance() { return this.props.provenance; }
    get createdAt() { return this.props.createdAt; }
}
exports.Source = Source;
//# sourceMappingURL=Source.js.map