"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Metadata = exports.ValidTimeRange = exports.VersionNumber = exports.ConfidenceScore = exports.RelationshipStatus = exports.RelationshipTypeId = exports.TargetEntityId = exports.SourceEntityId = exports.EntityId = exports.RelationshipId = void 0;
const ValueObject_1 = require("../../../../shared/domain/ValueObject");
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
class RelationshipId extends UniqueEntityId_1.UniqueEntityId {
    constructor(value) {
        super(value);
    }
}
exports.RelationshipId = RelationshipId;
class EntityId extends ValueObject_1.ValueObject {
    constructor(value) {
        super({ value });
    }
    get value() {
        return this.props.value;
    }
}
exports.EntityId = EntityId;
class SourceEntityId extends EntityId {
}
exports.SourceEntityId = SourceEntityId;
class TargetEntityId extends EntityId {
}
exports.TargetEntityId = TargetEntityId;
class RelationshipTypeId extends ValueObject_1.ValueObject {
    constructor(value) {
        super({ value });
    }
    get value() {
        return this.props.value;
    }
}
exports.RelationshipTypeId = RelationshipTypeId;
class RelationshipStatus extends ValueObject_1.ValueObject {
    constructor(value) {
        super({ value });
    }
    static create(value) {
        return new RelationshipStatus(value);
    }
}
exports.RelationshipStatus = RelationshipStatus;
class ConfidenceScore extends ValueObject_1.ValueObject {
    constructor(value) {
        if (value < 0 || value > 1) {
            throw new Error('ConfidenceScore must be between 0 and 1');
        }
        super({ value });
    }
}
exports.ConfidenceScore = ConfidenceScore;
class VersionNumber extends ValueObject_1.ValueObject {
    constructor(value) {
        super({ value });
    }
}
exports.VersionNumber = VersionNumber;
class ValidTimeRange extends ValueObject_1.ValueObject {
    constructor(props) {
        if (props.end && props.start > props.end) {
            throw new Error('Start date cannot be after end date');
        }
        super(props);
    }
}
exports.ValidTimeRange = ValidTimeRange;
class Metadata extends ValueObject_1.ValueObject {
    constructor(value) {
        super({ value });
    }
}
exports.Metadata = Metadata;
//# sourceMappingURL=RelationshipValueObjects.js.map