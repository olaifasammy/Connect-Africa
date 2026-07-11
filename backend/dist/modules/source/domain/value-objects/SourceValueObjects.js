"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Provenance = exports.SourceType = exports.SourceId = void 0;
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
class SourceId extends UniqueEntityId_1.UniqueEntityId {
}
exports.SourceId = SourceId;
var SourceType;
(function (SourceType) {
    SourceType["WEB"] = "WEB";
    SourceType["BOOK"] = "BOOK";
    SourceType["ACADEMIC_PAPER"] = "ACADEMIC_PAPER";
    SourceType["INTERVIEW"] = "INTERVIEW";
    SourceType["OTHER"] = "OTHER";
})(SourceType || (exports.SourceType = SourceType = {}));
class Provenance {
    author;
    publishedAt;
    url;
    publisher;
    constructor(author, publishedAt, url, publisher) {
        this.author = author;
        this.publishedAt = publishedAt;
        this.url = url;
        this.publisher = publisher;
    }
}
exports.Provenance = Provenance;
//# sourceMappingURL=SourceValueObjects.js.map