"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const validate = (schema) => {
    return (req, res, next) => {
        try {
            schema.parse(req.body);
            next();
        }
        catch (err) {
            res.status(400).json({ success: false, errors: err.errors });
        }
    };
};
exports.validate = validate;
//# sourceMappingURL=SettingsValidationMiddleware.js.map