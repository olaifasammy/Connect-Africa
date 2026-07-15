"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioValidator = void 0;
class AudioValidator {
    static isValid(mimeType) {
        const validAudioTypes = ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/aac'];
        return validAudioTypes.includes(mimeType.value);
    }
}
exports.AudioValidator = AudioValidator;
//# sourceMappingURL=AudioValidator.js.map