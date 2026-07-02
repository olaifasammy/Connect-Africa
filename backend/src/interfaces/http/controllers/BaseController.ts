import { Request, Response } from 'express';

export abstract class BaseController {
  protected abstract execute(req: Request, res: Response): Promise<void | any>;

  public async handle(req: Request, res: Response): Promise<void> {
    try {
      await this.execute(req, res);
    } catch (err) {
      this.handleError(res, err);
    }
  }

  protected handleError(res: Response, error: any): void {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}
