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
exports.SourceCreatedIndexer = void 0;
const inversify_1 = require("inversify");
const SearchAggregate_1 = require("../../../search/domain/models/SearchAggregate");
const SearchDocument_1 = require("../../../search/domain/models/SearchDocument");
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
let SourceCreatedIndexer = class SourceCreatedIndexer {
    searchRepository;
    constructor(searchRepository) {
        this.searchRepository = searchRepository;
    }
    async handle(event) {
        const document = new SearchDocument_1.SearchDocument(new UniqueEntityId_1.UniqueEntityId(), 'source', event.source.id, {
            title: event.source.title,
            url: event.source.url
        });
        const aggregate = SearchAggregate_1.SearchAggregate.create(document);
        await this.searchRepository.save(aggregate.getDocument());
    }
};
exports.SourceCreatedIndexer = SourceCreatedIndexer;
exports.SourceCreatedIndexer = SourceCreatedIndexer = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('ISearchRepository')),
    __metadata("design:paramtypes", [Object])
], SourceCreatedIndexer);
//# sourceMappingURL=SourceCreatedIndexer.js.map