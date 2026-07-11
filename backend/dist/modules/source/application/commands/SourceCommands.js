"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteSourceCommand = exports.UpdateSourceCommand = void 0;
class UpdateSourceCommand {
    sourceId;
    title;
    provenance;
    constructor(sourceId, title, provenance // Simplified
    ) {
        this.sourceId = sourceId;
        this.title = title;
        this.provenance = provenance;
    }
}
exports.UpdateSourceCommand = UpdateSourceCommand;
class DeleteSourceCommand {
    sourceId;
    constructor(sourceId) {
        this.sourceId = sourceId;
    }
}
exports.DeleteSourceCommand = DeleteSourceCommand;
//# sourceMappingURL=SourceCommands.js.map