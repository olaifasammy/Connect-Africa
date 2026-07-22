"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsController = void 0;
const ChangeThemeCommand_1 = require("../../application/commands/ChangeThemeCommand");
const SettingsCommands_1 = require("../../application/commands/SettingsCommands");
class SettingsController {
    changeThemeHandler;
    getSettingsHandler;
    updateSettingsHandler;
    updateLanguageHandler;
    updatePrivacyHandler;
    updateNotificationSettingsHandler;
    updateSecuritySettingsHandler;
    resetSettingsHandler;
    constructor(changeThemeHandler, getSettingsHandler, updateSettingsHandler, updateLanguageHandler, updatePrivacyHandler, updateNotificationSettingsHandler, updateSecuritySettingsHandler, resetSettingsHandler) {
        this.changeThemeHandler = changeThemeHandler;
        this.getSettingsHandler = getSettingsHandler;
        this.updateSettingsHandler = updateSettingsHandler;
        this.updateLanguageHandler = updateLanguageHandler;
        this.updatePrivacyHandler = updatePrivacyHandler;
        this.updateNotificationSettingsHandler = updateNotificationSettingsHandler;
        this.updateSecuritySettingsHandler = updateSecuritySettingsHandler;
        this.resetSettingsHandler = resetSettingsHandler;
    }
    async getSettings(req, res) {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ success: false, message: 'Unauthorized' });
            return;
        }
        const settings = await this.getSettingsHandler.handle(userId);
        if (!settings) {
            res.status(404).json({ success: false, message: 'Settings not found' });
            return;
        }
        res.status(200).json({ success: true, data: settings });
    }
    async updateSettings(req, res) {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ success: false, message: 'Unauthorized' });
            return;
        }
        const { theme, timezone, locale } = req.body;
        await this.updateSettingsHandler.handle(new SettingsCommands_1.UpdateSettingsCommand(userId, theme, timezone, locale));
        res.status(200).json({ success: true });
    }
    async changeTheme(req, res) {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ success: false, message: 'Unauthorized' });
            return;
        }
        const { theme } = req.body;
        await this.changeThemeHandler.handle(new ChangeThemeCommand_1.ChangeThemeCommand(userId, theme));
        res.status(200).json({ success: true });
    }
    async updateLanguage(req, res) {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ success: false, message: 'Unauthorized' });
            return;
        }
        const { locale } = req.body;
        await this.updateLanguageHandler.handle(new SettingsCommands_1.UpdateLanguageCommand(userId, locale));
        res.status(200).json({ success: true });
    }
    async updatePrivacy(req, res) {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ success: false, message: 'Unauthorized' });
            return;
        }
        const { level } = req.body;
        await this.updatePrivacyHandler.handle(new SettingsCommands_1.UpdatePrivacyCommand(userId, level));
        res.status(200).json({ success: true });
    }
    async updateNotificationSettings(req, res) {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ success: false, message: 'Unauthorized' });
            return;
        }
        const { enabled } = req.body;
        await this.updateNotificationSettingsHandler.handle(new SettingsCommands_1.UpdateNotificationSettingsCommand(userId, enabled));
        res.status(200).json({ success: true });
    }
    async updateSecuritySettings(req, res) {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ success: false, message: 'Unauthorized' });
            return;
        }
        const { mfaEnabled } = req.body;
        await this.updateSecuritySettingsHandler.handle(new SettingsCommands_1.UpdateSecuritySettingsCommand(userId, mfaEnabled));
        res.status(200).json({ success: true });
    }
    async resetSettings(req, res) {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ success: false, message: 'Unauthorized' });
            return;
        }
        await this.resetSettingsHandler.handle(new SettingsCommands_1.ResetSettingsCommand(userId));
        res.status(200).json({ success: true });
    }
}
exports.SettingsController = SettingsController;
//# sourceMappingURL=SettingsController.js.map