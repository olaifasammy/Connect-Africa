"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutocompleteController = void 0;
const inversify_1 = require("inversify");
const AutocompleteQueryHandler_1 = require("../../application/handlers/AutocompleteQueryHandler");
const AutocompleteQuery_1 = require("../../application/queries/AutocompleteQuery");
let AutocompleteController = class AutocompleteController {
    autocompleteQueryHandler;
    constructor(autocompleteQueryHandler) {
        this.autocompleteQueryHandler = autocompleteQueryHandler;
    }
    async autocomplete(req, res) {
        const query = req.query.q;
        if (!query) {
            res.status(400).json({ success: false, errors: [{ code: 'INVALID_QUERY', message: 'Query parameter is required' }] });
            return;
        }
        const autocompleteQuery = new AutocompleteQuery_1.AutocompleteQuery(query);
        const result = await this.autocompleteQueryHandler.handle(autocompleteQuery);
        res.json({ success: true, data: result });
    }
};
exports.AutocompleteController = AutocompleteController;
exports.AutocompleteController = AutocompleteController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(AutocompleteQueryHandler_1.AutocompleteQueryHandler)),
    __metadata("design:paramtypes", [AutocompleteQueryHandler_1.AutocompleteQueryHandler])
], AutocompleteController);
//# sourceMappingURL=AutocompleteController.js.map