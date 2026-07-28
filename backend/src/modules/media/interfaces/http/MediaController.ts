import { Request, Response } from 'express';
import { UploadMediaHandler } from '../../application/commands/UploadMediaHandler';
import { AttachMediaHandler } from '../../application/commands/AttachMediaHandler';
import { UploadMediaSchema } from './MediaValidation';

export class MediaController {
  constructor(
    private readonly uploadMediaHandler: UploadMediaHandler,
    private readonly attachMediaHandler: AttachMediaHandler
  ) {}

  async upload(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id;
    const validation = UploadMediaSchema.safeParse(req.body);
    if (!validation.success) {
      res.status(400).json({ success: false, errors: validation.error.format() });
      return;
    }

    if (!req.file) {
      res.status(400).json({ success: false, errors: { _errors: ['No file uploaded'] } });
      return;
    }

    const result = await this.uploadMediaHandler.handle({
      userId: userId!,
      data: {
        fileName: validation.data.fileName,
        mimeType: validation.data.mimeType,
        fileBuffer: req.file.buffer,
      },
    });
    res.status(201).json({ success: true, data: result });
  }

  async attach(req: Request, res: Response): Promise<void> {
    const mediaId = req.params.mediaId as string;
    const { resourceType, resourceId } = req.body;
    
    await this.attachMediaHandler.handle({
      data: { mediaId, resourceType, resourceId }
    });
    
    res.status(200).json({ success: true });
  }
}
