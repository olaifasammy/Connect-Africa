"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiController = void 0;
const AIDTOs_1 = require("../dto/AIDTOs");
class AiController {
    aiHandler;
    constructor(aiHandler) {
        this.aiHandler = aiHandler;
    }
    async process(req, res) {
        const validation = AIDTOs_1.AIRequestDTOSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({ success: false, errors: validation.error.issues });
        }
        const response = await this.aiHandler.handle({
            request: validation.data
        });
        res.json({ success: true, data: response });
    }
}
exports.AiController = AiController;
//# sourceMappingURL=AiController.js.map