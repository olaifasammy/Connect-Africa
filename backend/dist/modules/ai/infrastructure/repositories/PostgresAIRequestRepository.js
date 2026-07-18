"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresAIRequestRepository = void 0;
class PostgresAIRequestRepository {
    async save(request) {
        // In production, implement actual SQL query: 
        // await db.query('INSERT INTO ai_requests ...', [request.id, request.prompt, ...]);
    }
    async findById(id) {
        // In production, implement actual SQL query
        return null;
    }
}
exports.PostgresAIRequestRepository = PostgresAIRequestRepository;
//# sourceMappingURL=PostgresAIRequestRepository.js.map