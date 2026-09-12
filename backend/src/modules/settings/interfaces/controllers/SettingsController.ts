import { injectable, inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { Request, Response } from 'express';
import { GetSettingsHandler } from '../../application/handlers/GetSettingsHandler';
import { GetSystemSettingsHandler } from '../../application/handlers/GetSystemSettingsHandler';
import { GetUserSettingsHandler } from '../../application/handlers/GetUserSettingsHandler';
import { ChangeThemeHandler } from '../../application/handlers/ChangeThemeHandler';
import { UpdateSettingsHandler, UpdateLanguageHandler, UpdatePrivacyHandler, UpdateNotificationSettingsHandler, UpdateSecuritySettingsHandler, ResetSettingsHandler } from '../../application/handlers/SettingsHandlers';
import { ChangeThemeCommand } from '../../application/commands/ChangeThemeCommand';
import { UpdateSettingsCommand, UpdateLanguageCommand, UpdatePrivacyCommand, UpdateNotificationSettingsCommand, UpdateSecuritySettingsCommand, ResetSettingsCommand } from '../../application/commands/SettingsCommands';

@provide(SettingsController, true)
@injectable()
export class SettingsController {
  constructor(
    @inject(ChangeThemeHandler) private readonly changeThemeHandler: ChangeThemeHandler,
    @inject(GetSettingsHandler) private readonly getSettingsHandler: GetSettingsHandler,
    @inject(GetSystemSettingsHandler) private readonly getSystemSettingsHandler: GetSystemSettingsHandler,
    @inject(GetUserSettingsHandler) private readonly getUserSettingsHandler: GetUserSettingsHandler,
    @inject(UpdateSettingsHandler) private readonly updateSettingsHandler: UpdateSettingsHandler,
    @inject(UpdateLanguageHandler) private readonly updateLanguageHandler: UpdateLanguageHandler,
    @inject(UpdatePrivacyHandler) private readonly updatePrivacyHandler: UpdatePrivacyHandler,
    @inject(UpdateNotificationSettingsHandler) private readonly updateNotificationSettingsHandler: UpdateNotificationSettingsHandler,
    @inject(UpdateSecuritySettingsHandler) private readonly updateSecuritySettingsHandler: UpdateSecuritySettingsHandler,
    @inject(ResetSettingsHandler) private readonly resetSettingsHandler: ResetSettingsHandler
  ) {}

  async getSettings(req: Request, res: Response): Promise<void> {
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

  async updateSettings(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id;
    if (!userId) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
    }
    const { theme, timezone, locale } = req.body;
    await this.updateSettingsHandler.handle(new UpdateSettingsCommand(userId, theme, timezone, locale));
    res.status(200).json({ success: true });
  }

  async changeTheme(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id;
    if (!userId) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
    }
    const { theme } = req.body;
    
    await this.changeThemeHandler.handle(new ChangeThemeCommand(userId, theme));
    res.status(200).json({ success: true });
  }

  async updateLanguage(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id;
    if (!userId) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
    }
    const { locale } = req.body;
    await this.updateLanguageHandler.handle(new UpdateLanguageCommand(userId, locale));
    res.status(200).json({ success: true });
  }

  async updatePrivacy(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id;
    if (!userId) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
    }
    const { level } = req.body;
    await this.updatePrivacyHandler.handle(new UpdatePrivacyCommand(userId, level));
    res.status(200).json({ success: true });
  }

  async updateNotificationSettings(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id;
    if (!userId) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
    }
    const { enabled } = req.body;
    await this.updateNotificationSettingsHandler.handle(new UpdateNotificationSettingsCommand(userId, enabled));
    res.status(200).json({ success: true });
  }

  async updateSecuritySettings(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id;
    if (!userId) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
    }
    const { mfaEnabled } = req.body;
    await this.updateSecuritySettingsHandler.handle(new UpdateSecuritySettingsCommand(userId, mfaEnabled));
    res.status(200).json({ success: true });
  }

  async resetSettings(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id;
    if (!userId) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
    }
    await this.resetSettingsHandler.handle(new ResetSettingsCommand(userId));
    res.status(200).json({ success: true });
  }

  async getSystemSettings(req: Request, res: Response): Promise<void> {
    const settings = await this.getSystemSettingsHandler.handle();
    res.status(200).json({ success: true, data: settings });
  }

  async getUserSettings(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id;
    if (!userId) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
    }
    const settings = await this.getUserSettingsHandler.handle(userId);
    res.status(200).json({ success: true, data: settings });
  }
}
