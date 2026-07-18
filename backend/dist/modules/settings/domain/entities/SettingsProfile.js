"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsProfile = void 0;
const AggregateRoot_1 = require("../../../../shared/domain/AggregateRoot");
const SettingsValueObjects_1 = require("../value-objects/SettingsValueObjects");
class SettingsProfile extends AggregateRoot_1.AggregateRoot {
    constructor(props, id) {
        super(props, id || new SettingsValueObjects_1.SettingsProfileId());
    }
    static create(props, id) {
        return new SettingsProfile(props, id);
    }
    get userId() { return this.props.userId; }
    get displayName() { return this.props.displayName; }
    get avatarUrl() { return this.props.avatarUrl; }
    get bio() { return this.props.bio; }
    get updatedAt() { return this.props.updatedAt; }
    updateProfile(props) {
        Object.assign(this.props, props);
        this.props.updatedAt = new Date();
    }
}
exports.SettingsProfile = SettingsProfile;
//# sourceMappingURL=SettingsProfile.js.map