import { provide } from 'inversify-binding-decorators';
import { injectable, inject } from 'inversify';
import { Request, Response } from 'express';
import { UploadMediaHandler } from '../../application/commands/UploadMediaHandler';
import { AttachMediaHandler } from '../../application/commands/AttachMediaHandler';
import { AttachMediaCommand } from '../../application/commands/AttachMediaCommand';
import { GenerateThumbnailCommand } from '../../application/commands/GenerateThumbnailCommand';
import { MoveMediaCommand } from '../../application/commands/MoveMediaCommand';
import { RenameMediaCommand } from '../../application/commands/RenameMediaCommand';
import { CopyMediaCommand } from '../../application/commands/CopyMediaCommand';
import { UpdateMediaHandler } from '../../application/commands/UpdateMediaHandler';
import { ArchiveMediaHandler } from '../../application/commands/ArchiveMediaHandler';
import { DeleteMediaHandler } from '../../application/commands/DeleteMediaHandler';
import { GenerateThumbnailHandler } from '../../application/commands/GenerateThumbnailHandler';
import { MoveMediaHandler } from '../../application/commands/MoveMediaHandler';
import { PublishMediaHandler } from '../../application/commands/PublishMediaHandler';
import { RenameMediaHandler } from '../../application/commands/RenameMediaHandler';
import { RestoreMediaHandler } from '../../application/commands/RestoreMediaHandler';
import { CopyMediaHandler } from '../../application/commands/CopyMediaHandler';
import { GetMediaHandler } from '../../application/queries/GetMediaHandler';
import { SearchMediaHandler } from '../../application/queries/SearchMediaHandler';
import { GetMediaByArticleHandler } from '../../application/queries/GetMediaByArticleHandler';
import { GetMediaByEntityHandler } from '../../application/queries/GetMediaByEntityHandler';
import { GetMediaUsageHandler } from '../../application/queries/GetMediaUsageHandler';
import { GetMediaQuery } from '../../application/queries/GetMediaQuery';
import { SearchMediaQuery } from '../../application/queries/SearchMediaQuery';
import { GetMediaByArticleQuery } from '../../application/queries/GetMediaByArticleQuery';
import { GetMediaByEntityQuery } from '../../application/queries/GetMediaByEntityQuery';
import { GetMediaUsageQuery } from '../../application/queries/GetMediaUsageQuery';
import { MediaId } from '../../domain/value-objects/MediaId';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { UploadMediaSchema, AttachMediaSchema, GetMediaSchema, SearchMediaSchema, GetMediaByArticleSchema, GetMediaByEntitySchema, GetMediaUsageSchema, GenerateThumbnailSchema, MoveMediaSchema, RenameMediaSchema } from './MediaValidation';

@provide(MediaController, true)
@injectable()
export class MediaController {
  constructor(
    private readonly uploadMediaHandler: UploadMediaHandler,
    private readonly attachMediaHandler: AttachMediaHandler,
    private readonly updateMediaHandler: UpdateMediaHandler,
    private readonly archiveMediaHandler: ArchiveMediaHandler,
    private readonly deleteMediaHandler: DeleteMediaHandler,
    private readonly generateThumbnailHandler: GenerateThumbnailHandler,
    private readonly moveMediaHandler: MoveMediaHandler,
    private readonly publishMediaHandler: PublishMediaHandler,
    private readonly renameMediaHandler: RenameMediaHandler,
    private readonly restoreMediaHandler: RestoreMediaHandler,
    private readonly copyMediaHandler: CopyMediaHandler,
    private readonly getMediaHandler: GetMediaHandler,
    private readonly searchMediaHandler: SearchMediaHandler,
    private readonly getMediaByArticleHandler: GetMediaByArticleHandler,
    private readonly getMediaByEntityHandler: GetMediaByEntityHandler,
    private readonly getMediaUsageHandler: GetMediaUsageHandler
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
    const validation = AttachMediaSchema.safeParse(req.body);
    if (!validation.success) {
      res.status(400).json({ success: false, errors: validation.error.format() });
      return;
    }
    const mediaId = (typeof req.params.mediaId === "string") ? req.params.mediaId : req.params.mediaId[0];
    await this.attachMediaHandler.handle(new AttachMediaCommand({
      mediaId,
      resourceType: validation.data.resourceType,
      resourceId: validation.data.resourceId,
    }));
    res.status(200).json({ success: true });
  }

  async update(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id;
    const mediaId = (typeof req.params.id === "string") ? req.params.id : req.params.id[0];
    const { title, description, metadata } = req.body;
    
    await this.updateMediaHandler.handle({
      data: { id: mediaId, title, description, metadata },
      userId: userId!
    });
    
    res.status(200).json({ success: true });
  }

  async generateThumbnail(req: Request, res: Response): Promise<void> {
    const validation = GenerateThumbnailSchema.safeParse(req.body);
    if (!validation.success) {
      res.status(400).json({ success: false, errors: validation.error.format() });
      return;
    }
    const mediaId = (typeof req.params.id === "string") ? req.params.id : req.params.id[0];
    
    const result = await this.generateThumbnailHandler.handle(new GenerateThumbnailCommand({
        mediaId,
        size: validation.data.size || 'medium'
    }));
    
    res.status(200).json({ success: true, data: result });
  }

  async move(req: Request, res: Response): Promise<void> {
    const validation = MoveMediaSchema.safeParse(req.body);
    if (!validation.success) {
      res.status(400).json({ success: false, errors: validation.error.format() });
      return;
    }
    const mediaId = (typeof req.params.id === "string") ? req.params.id : req.params.id[0];
    
    await this.moveMediaHandler.handle(new MoveMediaCommand({
      id: mediaId,
      newParentId: validation.data.newParentId
    }));
    
    res.status(200).json({ success: true });
  }

  async rename(req: Request, res: Response): Promise<void> {
    const validation = RenameMediaSchema.safeParse(req.body);
    if (!validation.success) {
      res.status(400).json({ success: false, errors: validation.error.format() });
      return;
    }
    const mediaId = (typeof req.params.id === "string") ? req.params.id : req.params.id[0];
    
    await this.renameMediaHandler.handle(new RenameMediaCommand({
      id: mediaId,
      newName: validation.data.newName
    }));
    
    res.status(200).json({ success: true });
  }

  async copy(req: Request, res: Response): Promise<void> {
    const mediaId = (typeof req.params.id === "string") ? req.params.id : req.params.id[0];
    const { destinationId } = req.body;
    
    const result = await this.copyMediaHandler.handle(new CopyMediaCommand(
      mediaId,
      destinationId
    ));
    
    res.status(201).json({ success: true, data: result });
  }

  async archive(req: Request, res: Response): Promise<void> {
    const mediaId = (typeof req.params.id === "string") ? req.params.id : req.params.id[0];
    
    await this.archiveMediaHandler.handle({
      id: mediaId
    });
    
    res.status(200).json({ success: true });
  }

  async delete(req: Request, res: Response): Promise<void> {
    const mediaId = (typeof req.params.id === "string") ? req.params.id : req.params.id[0];
    
    await this.deleteMediaHandler.handle({
      id: mediaId
    });
    
    res.status(204).send();
  }

  async publish(req: Request, res: Response): Promise<void> {
    const mediaId = (typeof req.params.id === "string") ? req.params.id : req.params.id[0];
    
    await this.publishMediaHandler.handle({
      id: mediaId
    });
    
    res.status(200).json({ success: true });
  }

  async restore(req: Request, res: Response): Promise<void> {
    const mediaId = (typeof req.params.id === "string") ? req.params.id : req.params.id[0];
    
    await this.restoreMediaHandler.handle({
      id: mediaId
    });
    
    res.status(200).json({ success: true });
  }

  async getMedia(req: Request, res: Response): Promise<void> {
    const validation = GetMediaSchema.safeParse(req.params);
    if (!validation.success) {
      res.status(400).json({ success: false, errors: validation.error.format() });
      return;
    }
    const result = await this.getMediaHandler.handle(new GetMediaQuery(new MediaId(validation.data.id)));
    if (!result) {
        res.status(404).json({ success: false, message: 'Media not found' });
        return;
    }
    res.status(200).json({ success: true, data: result });
  }

  async searchMedia(req: Request, res: Response): Promise<void> {
    const validation = SearchMediaSchema.safeParse(req.query);
    if (!validation.success) {
      res.status(400).json({ success: false, errors: validation.error.format() });
      return;
    }
    const result = await this.searchMediaHandler.handle(new SearchMediaQuery(validation.data));
    res.status(200).json({ success: true, data: result });
  }

  async getMediaByArticle(req: Request, res: Response): Promise<void> {
    const validation = GetMediaByArticleSchema.safeParse(req.params);
    if (!validation.success) {
      res.status(400).json({ success: false, errors: validation.error.format() });
      return;
    }
    const result = await this.getMediaByArticleHandler.handle(new GetMediaByArticleQuery(new UniqueEntityId(validation.data.articleId)));
    res.status(200).json({ success: true, data: result });
  }
  
  async getMediaByEntity(req: Request, res: Response): Promise<void> {
    const validation = GetMediaByEntitySchema.safeParse(req.params);
    if (!validation.success) {
      res.status(400).json({ success: false, errors: validation.error.format() });
      return;
    }
    const result = await this.getMediaByEntityHandler.handle(new GetMediaByEntityQuery(new UniqueEntityId(validation.data.entityId)));
    res.status(200).json({ success: true, data: result });
  }

  async getMediaUsage(req: Request, res: Response): Promise<void> {
    const validation = GetMediaUsageSchema.safeParse(req.params);
    if (!validation.success) {
      res.status(400).json({ success: false, errors: validation.error.format() });
      return;
    }
    const result = await this.getMediaUsageHandler.handle(new GetMediaUsageQuery(new MediaId(validation.data.mediaId)));
    res.status(200).json({ success: true, data: result });
  }
}
