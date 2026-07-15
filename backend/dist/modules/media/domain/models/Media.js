"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Media = void 0;
const AggregateRoot_1 = require("../../../../shared/domain/AggregateRoot");
const FileName_1 = require("../value-objects/FileName");
const MediaUploadedEvent_1 = require("../events/MediaUploadedEvent");
const MediaStatus_1 = require("../value-objects/MediaStatus");
class Media extends AggregateRoot_1.AggregateRoot {
    constructor(props, id) {
        super(props, id);
    }
    static create(props, id) {
        const media = new Media(props, id);
        media.addDomainEvent(new MediaUploadedEvent_1.MediaUploadedEvent(media.id));
        return media;
    }
    publish() {
        this.props.status = MediaStatus_1.MediaStatus.create(MediaStatus_1.MediaStatusType.PUBLISHED);
    }
    archive() {
        this.props.status = MediaStatus_1.MediaStatus.create(MediaStatus_1.MediaStatusType.ARCHIVED);
    }
    rename(newName) {
        this.props.fileName = new FileName_1.FileName(newName);
    }
    get fileName() {
        return this.props.fileName;
    }
    get mimeType() {
        return this.props.mimeType;
    }
    get uploadedAt() {
        return this.props.uploadedAt;
    }
    get filePath() {
        return this.props.filePath;
    }
    get fileSize() {
        return this.props.fileSize;
    }
    get status() {
        return this.props.status;
    }
    get title() {
        return this.props.title;
    }
    get ownerId() {
        return this.props.ownerId;
    }
}
exports.Media = Media;
//# sourceMappingURL=Media.js.map