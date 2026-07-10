"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlugGenerationService = void 0;
class SlugGenerationService {
    generate(name) {
        return name.value
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
    }
}
exports.SlugGenerationService = SlugGenerationService;
//# sourceMappingURL=SlugGenerationService.js.map