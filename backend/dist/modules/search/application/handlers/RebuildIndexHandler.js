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
exports.RebuildIndexHandler = exports.RebuildIndexCommand = void 0;
const inversify_1 = require("inversify");
const SearchProvider_1 = require("../../infrastructure/search/SearchProvider");
class RebuildIndexCommand {
    name;
    constructor(name) {
        this.name = name;
    }
}
exports.RebuildIndexCommand = RebuildIndexCommand;
let RebuildIndexHandler = class RebuildIndexHandler {
    provider;
    constructor(provider) {
        this.provider = provider;
    }
    async handle(command) {
        await this.provider.rebuildIndex(command.name);
    }
};
exports.RebuildIndexHandler = RebuildIndexHandler;
exports.RebuildIndexHandler = RebuildIndexHandler = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(SearchProvider_1.SearchProvider)),
    __metadata("design:paramtypes", [SearchProvider_1.SearchProvider])
], RebuildIndexHandler);
//# sourceMappingURL=RebuildIndexHandler.js.map