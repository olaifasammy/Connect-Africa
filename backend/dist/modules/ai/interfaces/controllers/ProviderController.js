"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderController = void 0;
const GetProviderHealthQuery_1 = require("../../application/queries/GetProviderHealthQuery");
class ProviderController {
    healthHandler;
    constructor(healthHandler) {
        this.healthHandler = healthHandler;
    }
    async getHealth(req, res) {
        const id = req.params.id;
        const query = new GetProviderHealthQuery_1.GetProviderHealthQuery(id);
        const result = await this.healthHandler.handle(query);
        res.json({ success: true, data: result });
    }
}
exports.ProviderController = ProviderController;
//# sourceMappingURL=ProviderController.js.map