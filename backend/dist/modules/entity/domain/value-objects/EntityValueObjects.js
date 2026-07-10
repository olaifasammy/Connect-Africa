"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Visibility = exports.VersionNumber = exports.AliasName = exports.ExternalIdentifier = exports.EntityTypeId = exports.EntityStatus = exports.EntitySlug = void 0;
const ValueObject_1 = require("../../../../shared/domain/ValueObject");
class EntitySlug extends ValueObject_1.ValueObject {
    constructor(value) {
        if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) {
            throw new Error('Invalid slug format');
        }
        super({ value });
    }
}
exports.EntitySlug = EntitySlug;
class EntityStatus extends ValueObject_1.ValueObject {
    constructor(value) {
        super({ value });
    }
}
exports.EntityStatus = EntityStatus;
class EntityTypeId extends ValueObject_1.ValueObject {
    constructor(value) {
        super({ value });
    }
}
exports.EntityTypeId = EntityTypeId;
class ExternalIdentifier extends ValueObject_1.ValueObject {
    constructor(props) {
        super(props);
    }
}
exports.ExternalIdentifier = ExternalIdentifier;
class AliasName extends ValueObject_1.ValueObject {
    constructor(value) {
        super({ value });
    }
    get value() {
        return this.props.value;
    }
    static create(value) {
        return new AliasName(value);
    }
}
exports.AliasName = AliasName;
class VersionNumber extends ValueObject_1.ValueObject {
    constructor(value) {
        if (value < 1)
            throw new Error('Version must be >= 1');
        super({ value });
    }
}
exports.VersionNumber = VersionNumber;
class Visibility extends ValueObject_1.ValueObject {
    constructor(value) {
        super({ value });
    }
}
exports.Visibility = Visibility;
//# sourceMappingURL=EntityValueObjects.js.map