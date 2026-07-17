import { Request, Response } from 'express';
import { GetSettingsHandler } from '../../application/handlers/GetSettingsHandler';
import { ChangeThemeHandler } from '../../application/handlers/ChangeThemeHandler';
import { UpdateSettingsHandler, UpdateLanguageHandler, UpdatePrivacyHandler, UpdateNotificationSettingsHandler, UpdateSecuritySettingsHandler, ResetSettingsHandler } from '../../application/handlers/SettingsHandlers';
import { ChangeThemeCommand } from '../../application/commands/ChangeThemeCommand';
import { UpdateSettingsCommand, UpdateLanguageCommand, UpdatePrivacyCommand, UpdateNotificationSettingsCommand, UpdateSecuritySettingsCommand, ResetSettingsCommand } from '../../application/commands/SettingsCommands';

export class SettingsController {
  constructor(
    private readonly changeThemeHandler: ChangeThemeHandler,
    private readonly getSettingsHandler: GetSettingsHandler,
    private readonly updateSettingsHandler: UpdateSettingsHandler,
    private readonly updateLanguageHandler: UpdateLanguageHandler,
    private readonly updatePrivacyHandler: UpdatePrivacyHandler,
    private readonly updateNotificationSettingsHandler: UpdateNotificationSettingsHandler,
    private readonly updateSecuritySettingsHandler: UpdateSecuritySettingsHandler,
    private readonly resetSettingsHandler: ResetSettingsHandler
  ) {}

  async getSettings(req: Request, res: Response): Promise<void> {
    const userId = (req as any).user?.id;
    const settings = await this.getSettingsHandler.handle(userId);
    if (!settings) {
      res.status(404).json({ success: false, message: 'Settings not found' });
      return;
    }
    res.status(200).json({ success: true, data: settings });
  }

  async updateSettings(req: Request, res: Response): Promise<void> {
    const userId = (req as any).user?.id;
    const { theme, timezone, locale } = req.body;
    await this.updateSettingsHandler.handle(new UpdateSettingsCommand(userId, theme, timezone, locale));
    res.status(200).json({ success: true });
  }

  async changeTheme(req: Request, res: Response): Promise<void> {
    const userId = (req as any).user?.id;
    const { theme } = req.body;
    
    await this.changeThemeHandler.handle(new ChangeThemeCommand(userId, theme));
    res.status(200).json({ success: true });
  }

  async updateLanguage(req: Request, res: Response): Promise<void> {
    const userId = (req as any).user?.id;
    const { locale } = req.body;
    await this.updateLanguageHandler.handle(new UpdateLanguageCommand(userId, locale));
    res.status(200).json({ success: true });
  }

  async updatePrivacy(req: Request, res: Response): Promise<void> {
    const userId = (req as any).user?.id;
    const { level } = req.body;
    await this.updatePrivacyHandler.handle(new UpdatePrivacyCommand(userId, level));
    res.status(200).json({ success: true });
  }

  async updateNotificationSettings(req: Request, res: Response): Promise<void> {
    const userId = (req as any).user?.id;
    const { enabled } = req.body;
    await this.updateNotificationSettingsHandler.handle(new UpdateNotificationSettingsCommand(userId, enabled));
    res.status(200).json({ success: true });
  }

  async updateSecuritySettings(req: Request, res: Response): Promise<void> {
    const userId = (req as any).user?.id;
    const { mfaEnabled } = req.body;
    await this.updateSecuritySettingsHandler.handle(new UpdateSecuritySettingsCommand(userId, mfaEnabled));
    res.status(200).json({ success: true });
  }

  async resetSettings(req: Request, res: Response): Promise<void> {
    const userId = (req as any).user?.id;
    await this.resetSettingsHandler.handle(new ResetSettingsCommand(userId));
    res.status(200).json({ success: true });
  }
}
