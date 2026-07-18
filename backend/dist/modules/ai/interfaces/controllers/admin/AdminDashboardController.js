"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminDashboardController = void 0;
class AdminDashboardController {
    async getAiDashboard(req, res) { res.json({ dashboard: 'AI' }); }
    async getProviderDashboard(req, res) { res.json({ dashboard: 'Provider' }); }
    async getCrawlDashboard(req, res) { res.json({ dashboard: 'Crawl' }); }
    async getKnowledgeGapDashboard(req, res) { res.json({ dashboard: 'KnowledgeGap' }); }
    async getAnalyticsDashboard(req, res) { res.json({ dashboard: 'Analytics' }); }
}
exports.AdminDashboardController = AdminDashboardController;
//# sourceMappingURL=AdminDashboardController.js.map