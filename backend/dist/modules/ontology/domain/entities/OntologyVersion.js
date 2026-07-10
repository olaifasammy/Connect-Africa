"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OntologyVersion = void 0;
const AggregateRoot_1 = require("../../../../shared/domain/AggregateRoot");
const DomainError_1 = require("../errors/DomainError");
class OntologyVersion extends AggregateRoot_1.AggregateRoot {
    constructor(props, id) {
        super(props, id);
    }
    static create(props, id) {
        if (props.version < 1) {
            throw new DomainError_1.DomainError('Ontology version must be at least 1.');
        }
        return new OntologyVersion(props, id);
    }
    get version() {
        return this.props.version;
    }
    get isPublished() {
        return this.props.isPublished;
    }
    publish() {
        if (this.props.isPublished) {
            throw new DomainError_1.DomainError('Version is already published.');
        }
        this.props.isPublished = true;
    }
    get createdAt() {
        return this.props.createdAt;
    }
}
exports.OntologyVersion = OntologyVersion;
//# sourceMappingURL=OntologyVersion.js.map