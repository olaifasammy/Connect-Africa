"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Provider = void 0;
class Provider {
    id;
    name;
    isEnabled;
    priority;
    constructor(id, name, isEnabled, priority) {
        this.id = id;
        this.name = name;
        this.isEnabled = isEnabled;
        this.priority = priority;
    }
}
exports.Provider = Provider;
//# sourceMappingURL=Provider.js.map