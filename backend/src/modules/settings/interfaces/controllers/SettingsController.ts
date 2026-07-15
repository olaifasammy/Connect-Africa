import { Request, Response } from 'express';
import { ChangeThemeHandler } from '../../application/handlers/ChangeThemeHandler';
import { ChangeThemeCommand } from '../../application/commands/ChangeThemeCommand';

export class SettingsController {
  constructor(private readonly changeThemeHandler: ChangeThemeHandler) {}

  async changeTheme(req: Request, res: Response): Promise<void> {
    const userId = (req as any).user?.id;
    const { theme } = req.body;
    
    await this.changeThemeHandler.handle(new ChangeThemeCommand(userId, theme));
    res.status(200).json({ success: true });
  }
}
