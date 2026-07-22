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
exports.PostgresPromptRepository = void 0;
const inversify_1 = require("inversify");
const Prompt_1 = require("../../domain/entities/Prompt");
const PostgresProvider_1 = require("../../../../shared/infrastructure/database/PostgresProvider");
let PostgresPromptRepository = class PostgresPromptRepository {
    db;
    constructor(db) {
        this.db = db;
    }
    async save(prompt) {
        await this.db.query('INSERT INTO ai_prompts (id, name, content, version) VALUES ($1, $2, $3, $4) ON CONFLICT (id) DO UPDATE SET content = $3, version = $4', [prompt.id, prompt.name, prompt.content, prompt.version]);
    }
    async findById(id) {
        const result = await this.db.query('SELECT * FROM ai_prompts WHERE id = $1', [id]);
        if (result.rows.length === 0)
            return null;
        const row = result.rows[0];
        return new Prompt_1.Prompt(row.id, row.name, row.content, row.version);
    }
    async findByName(name) {
        const result = await this.db.query('SELECT * FROM ai_prompts WHERE name = $1 ORDER BY version DESC LIMIT 1', [name]);
        if (result.rows.length === 0)
            return null;
        const row = result.rows[0];
        return new Prompt_1.Prompt(row.id, row.name, row.content, row.version);
    }
};
exports.PostgresPromptRepository = PostgresPromptRepository;
exports.PostgresPromptRepository = PostgresPromptRepository = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('PostgresProvider')),
    __metadata("design:paramtypes", [PostgresProvider_1.PostgresProvider])
], PostgresPromptRepository);
//# sourceMappingURL=PostgresPromptRepository.js.map