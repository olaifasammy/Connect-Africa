import { Request, Response } from 'express';
import { GetSettingsHandler } from '../../application/handlers/GetSettingsHandler';
import { ChangeThemeHandler } from '../../application/handlers/ChangeThemeHandler';
import { UpdateSettingsHandler, UpdateLanguageHandler, UpdatePrivacyHandler, UpdateNotificationSettingsHandler, UpdateSecuritySettingsHandler, ResetSettingsHandler } from '../../application/handlers/SettingsHandlers';
export declare class SettingsController {
    private readonly changeThemeHandler;
    private readonly getSettingsHandler;
    private readonly updateSettingsHandler;
    private readonly updateLanguageHandler;
    private readonly updatePrivacyHandler;
    private readonly updateNotificationSettingsHandler;
    private readonly updateSecuritySettingsHandler;
    private readonly resetSettingsHandler;
    constructor(changeThemeHandler: ChangeThemeHandler, getSettingsHandler: GetSettingsHandler, updateSettingsHandler: UpdateSettingsHandler, updateLanguageHandler: UpdateLanguageHandler, updatePrivacyHandler: UpdatePrivacyHandler, updateNotificationSettingsHandler: UpdateNotificationSettingsHandler, updateSecuritySettingsHandler: UpdateSecuritySettingsHandler, resetSettingsHandler: ResetSettingsHandler);
    getSettings(req: Request, res: Response): Promise<void>;
    updateSettings(req: Request, res: Response): Promise<void>;
    changeTheme(req: Request, res: Response): Promise<void>;
    updateLanguage(req: Request, res: Response): Promise<void>;
    updatePrivacy(req: Request, res: Response): Promise<void>;
    updateNotificationSettings(req: Request, res: Response): Promise<void>;
    updateSecuritySettings(req: Request, res: Response): Promise<void>;
    resetSettings(req: Request, res: Response): Promise<void>;
}
