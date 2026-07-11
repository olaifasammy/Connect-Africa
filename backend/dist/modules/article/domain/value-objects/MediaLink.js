"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaLink = exports.MediaType = void 0;
var MediaType;
(function (MediaType) {
    MediaType["IMAGE"] = "IMAGE";
    MediaType["DOCUMENT"] = "DOCUMENT";
    MediaType["VIDEO"] = "VIDEO";
})(MediaType || (exports.MediaType = MediaType = {}));
class MediaLink {
    props;
    constructor(props) {
        this.props = props;
    }
}
exports.MediaLink = MediaLink;
//# sourceMappingURL=MediaLink.js.map