"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniqueNodePolicy = void 0;
class UniqueNodePolicy {
    static check(nodes, newNode) {
        return !nodes.some(n => n.entityId === newNode.entityId);
    }
}
exports.UniqueNodePolicy = UniqueNodePolicy;
//# sourceMappingURL=UniqueNodePolicy.js.map