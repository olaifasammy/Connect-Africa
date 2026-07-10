"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ontology = void 0;
const AggregateRoot_1 = require("../../../../shared/domain/AggregateRoot");
const OntologyCreatedEvent_1 = require("../events/OntologyCreatedEvent");
const OntologyUpdatedEvent_1 = require("../events/OntologyUpdatedEvent");
const OntologyPublishedEvent_1 = require("../events/OntologyPublishedEvent");
const OntologyArchivedEvent_1 = require("../events/OntologyArchivedEvent");
const DomainError_1 = require("../errors/DomainError");
class Ontology extends AggregateRoot_1.AggregateRoot {
    constructor(props, id) {
        super(props, id);
        this.validate(props);
    }
    validate(props) {
        if (!props.name || props.name.trim().length === 0) {
            throw new DomainError_1.DomainError('Ontology name is required.');
        }
        if (props.version < 1) {
            throw new DomainError_1.DomainError('Ontology version must be at least 1.');
        }
    }
    static create(props, id) {
        const ontology = new Ontology(props, id);
        if (!id) {
            ontology.addDomainEvent(new OntologyCreatedEvent_1.OntologyCreatedEvent(ontology.id, props.name));
        }
        return ontology;
    }
    update(name, description) {
        this.props.name = name;
        this.props.description = description;
        this.addDomainEvent(new OntologyUpdatedEvent_1.OntologyUpdatedEvent(this.id));
    }
    publish() {
        if (this.props.isArchived) {
            throw new DomainError_1.DomainError('Cannot publish an archived ontology.');
        }
        this.props.isPublished = true;
        this.addDomainEvent(new OntologyPublishedEvent_1.OntologyPublishedEvent(this.id));
    }
    archive() {
        this.props.isArchived = true;
        this.addDomainEvent(new OntologyArchivedEvent_1.OntologyArchivedEvent(this.id));
    }
    get id() {
        return this._id;
    }
    get name() {
        return this.props.name;
    }
    get description() {
        return this.props.description;
    }
    get version() {
        return this.props.version;
    }
    get isPublished() {
        return this.props.isPublished;
    }
    get isArchived() {
        return this.props.isArchived;
    }
}
exports.Ontology = Ontology;
//# sourceMappingURL=Ontology.js.map