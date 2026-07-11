"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RevisionDiffService = void 0;
class RevisionDiffService {
    static diff(current, previous) {
        const diff = {};
        for (const key in current) {
            if (current[key] !== previous[key]) {
                diff[key] = {
                    from: previous[key],
                    to: current[key]
                };
            }
        }
        return diff;
    }
}
exports.RevisionDiffService = RevisionDiffService;
//# sourceMappingURL=RevisionDiffService.js.map