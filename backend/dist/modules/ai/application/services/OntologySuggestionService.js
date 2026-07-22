"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OntologySuggestionService = void 0;
class OntologySuggestionService {
    ontologyGraphService;
    constructor(ontologyGraphService) {
        this.ontologyGraphService = ontologyGraphService;
    }
    suggest(content) {
        // Integration point: Use ontologyGraphService here
        return ['Concept1'];
    }
}
exports.OntologySuggestionService = OntologySuggestionService;
//# sourceMappingURL=OntologySuggestionService.js.map