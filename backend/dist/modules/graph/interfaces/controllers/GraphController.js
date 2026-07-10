"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphController = void 0;
const GetGraphPathQuery_1 = require("../../application/queries/GetGraphPathQuery");
const GetGraphPathRequestDto_1 = require("../../application/dto/GetGraphPathRequestDto");
class GraphController {
    getPathHandler;
    constructor(getPathHandler) {
        this.getPathHandler = getPathHandler;
    }
    async getPath(req, res) {
        const validation = GetGraphPathRequestDto_1.GetGraphPathRequestSchema.safeParse(req.query);
        if (!validation.success) {
            return res.status(400).json({ success: false, errors: validation.error.issues });
        }
        const { start, end } = validation.data;
        const userId = req.user?.id || 'anonymous';
        const ipAddress = req.ip || 'unknown';
        const path = await this.getPathHandler.handle(new GetGraphPathQuery_1.GetGraphPathQuery(start, end), userId, ipAddress);
        const response = { path };
        res.status(200).json({ success: true, data: response });
    }
}
exports.GraphController = GraphController;
//# sourceMappingURL=GraphController.js.map