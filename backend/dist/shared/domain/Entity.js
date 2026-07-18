"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
const UniqueEntityId_1 = require("./UniqueEntityId");
class Entity {
    _id;
    _props;
    constructor(props, id) {
        this._id = id || new UniqueEntityId_1.UniqueEntityId();
        this._props = props;
    }
    get id() {
        return this._id;
    }
    get props() {
        return this._props;
    }
    equals(object) {
        if (object == null || object === undefined) {
            return false;
        }
        if (this === object) {
            return true;
        }
        return this._id.equals(object._id);
    }
}
exports.Entity = Entity;
//# sourceMappingURL=Entity.js.map