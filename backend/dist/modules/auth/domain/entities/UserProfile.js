"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProfile = void 0;
const AggregateRoot_1 = require("../../../../shared/domain/AggregateRoot");
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
class UserProfile extends AggregateRoot_1.AggregateRoot {
    constructor(props, id) {
        super(props, id);
    }
    static create(props, id) {
        const entityId = id ? new UniqueEntityId_1.UniqueEntityId(id.value) : new UniqueEntityId_1.UniqueEntityId();
        return new UserProfile(props, entityId);
    }
    get userId() { return this.props.userId; }
    get bio() { return this.props.bio; }
    get avatarUrl() { return this.props.avatarUrl; }
    get displayName() { return this.props.displayName; }
    get coverImageUrl() { return this.props.coverImageUrl; }
    get website() { return this.props.website; }
    get socialLinks() { return this.props.socialLinks; }
    get country() { return this.props.country; }
    get languages() { return this.props.languages; }
    get expertise() { return this.props.expertise; }
    get researchInterests() { return this.props.researchInterests; }
    updateProfile(props) {
        Object.assign(this.props, props);
    }
}
exports.UserProfile = UserProfile;
//# sourceMappingURL=UserProfile.js.map