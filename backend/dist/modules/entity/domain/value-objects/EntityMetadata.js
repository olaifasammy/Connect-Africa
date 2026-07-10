"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityMetadata = void 0;
const ValueObject_1 = require("../../../../shared/domain/ValueObject");
class EntityMetadata extends ValueObject_1.ValueObject {
    constructor(props) {
        super(props);
    }
    static create(props) {
        return new EntityMetadata({
            slug: props.slug,
            description: props.description,
            source: props.source,
            tags: props.tags || [],
        });
    }
    get slug() {
        return this.props.slug;
    }
    get description() {
        return this.props.description;
    }
    get source() {
        return this.props.source;
    }
    get tags() {
        return this.props.tags;
    }
    merge(other) {
        return EntityMetadata.create({
            slug: other.slug || this.slug,
            description: other.description || this.description,
            source: other.source || this.source,
            tags: [...new Set([...this.tags, ...other.tags])],
        });
    }
}
exports.EntityMetadata = EntityMetadata;
//# sourceMappingURL=EntityMetadata.js.map