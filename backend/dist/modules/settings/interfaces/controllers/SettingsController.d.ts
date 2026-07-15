import { Request, Response } from 'express';
import { ChangeThemeHandler } from '../../application/handlers/ChangeThemeHandler';
export declare class SettingsController {
    private readonly changeThemeHandler;
    constructor(changeThemeHandler: ChangeThemeHandler);
    changeTheme(req: Request, res: Response): Promise<void>;
}
