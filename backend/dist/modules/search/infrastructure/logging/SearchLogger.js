"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchLogger = void 0;
const winston_1 = __importDefault(require("winston"));
const logger = winston_1.default.createLogger({
    level: 'info',
    format: winston_1.default.format.json(),
    defaultMeta: { service: 'search-service' },
    transports: [
        new winston_1.default.transports.Console()
    ]
});
class SearchLogger {
    static logFailedIndexing(docId, error) {
        logger.error('Failed indexing document', { docId, error: error.message, stack: error.stack });
    }
    static logFailedSearch(query, error) {
        logger.error('Failed executing search query', { query, error: error.message, stack: error.stack });
    }
    static logPerformance(operation, durationMs) {
        logger.info('Search operation performance', { operation, durationMs });
        if (durationMs > 1000) {
            logger.warn('Slow search query detected', { operation, durationMs });
        }
    }
}
exports.SearchLogger = SearchLogger;
//# sourceMappingURL=SearchLogger.js.map