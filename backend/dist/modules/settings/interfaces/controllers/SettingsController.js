"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsController = void 0;
const ChangeThemeCommand_1 = require("../../application/commands/ChangeThemeCommand");
class SettingsController {
    changeThemeHandler;
    constructor(changeThemeHandler) {
        this.changeThemeHandler = changeThemeHandler;
    }
    async changeTheme(req, res) {
        const userId = req.user?.id;
        const { theme } = req.body;
        await this.changeThemeHandler.handle(new ChangeThemeCommand_1.ChangeThemeCommand(userId, theme));
        res.status(200).json({ success: true });
    }
}
exports.SettingsController = SettingsController;
//# sourceMappingURL=SettingsController.js.map