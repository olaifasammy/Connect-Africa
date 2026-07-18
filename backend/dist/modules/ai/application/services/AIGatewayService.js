"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIGatewayService = void 0;
class AIGatewayService {
    selectionService;
    registry;
    constructor(selectionService, registry) {
        this.selectionService = selectionService;
        this.registry = registry;
    }
    async processRequest(request) {
        const provider = await this.selectionService.selectBestProvider();
        const gateway = this.registry.get(provider.id);
        if (!gateway) {
            throw new Error(`Provider instance for ${provider.name} not registered`);
        }
        return gateway.processRequest(request);
    }
}
exports.AIGatewayService = AIGatewayService;
//# sourceMappingURL=AIGatewayService.js.map