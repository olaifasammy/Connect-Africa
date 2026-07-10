"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
const Logger_1 = require("../../../logger/Logger");
class BaseController {
    handleError(res, error) {
        Logger_1.logger.error('Controller error', { error: error.message });
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}
exports.BaseController = BaseController;
//# sourceMappingURL=BaseController.js.map