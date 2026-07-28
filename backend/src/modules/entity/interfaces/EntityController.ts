import { Request, Response } from 'express';
import { CreateEntityCommandHandler } from '@modules/entity/application/handlers/CreateEntityCommandHandler';
import { UpdateEntityCommandHandler } from '@modules/entity/application/handlers/UpdateEntityCommandHandler';
import { DeleteEntityCommandHandler } from '@modules/entity/application/handlers/DeleteEntityCommandHandler';
import { PublishEntityCommandHandler } from '@modules/entity/application/handlers/PublishEntityCommandHandler';
import { ArchiveEntityCommandHandler } from '@modules/entity/application/handlers/ArchiveEntityCommandHandler';
import { RestoreEntityCommandHandler } from '@modules/entity/application/handlers/RestoreEntityCommandHandler';
import { MergeEntitiesCommandHandler } from '@modules/entity/application/handlers/MergeEntitiesCommandHandler';
import { AddAliasCommandHandler } from '@modules/entity/application/handlers/AddAliasCommandHandler';
import { RemoveAliasCommandHandler } from '@modules/entity/application/handlers/RemoveAliasCommandHandler';
import { CreateEntityVersionCommandHandler } from '@modules/entity/application/handlers/CreateEntityVersionCommandHandler';

import { CreateEntitySchema } from '@modules/entity/application/dto/CreateEntityRequest';
import { UpdateEntitySchema } from '@modules/entity/application/dto/UpdateEntityRequest';

export class EntityController {
  constructor(
    private readonly createHandler: CreateEntityCommandHandler,
    private readonly updateHandler: UpdateEntityCommandHandler,
    private readonly deleteHandler: DeleteEntityCommandHandler,
    private readonly publishHandler: PublishEntityCommandHandler,
    private readonly archiveHandler: ArchiveEntityCommandHandler,
    private readonly restoreHandler: RestoreEntityCommandHandler,
    private readonly mergeHandler: MergeEntitiesCommandHandler,
    private readonly addAliasHandler: AddAliasCommandHandler,
    private readonly removeAliasHandler: RemoveAliasCommandHandler,
    private readonly createVersionHandler: CreateEntityVersionCommandHandler
  ) {}

  async create(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id;
    const validationResult = CreateEntitySchema.safeParse(req.body);
    if (!validationResult.success) {
      res.status(400).json({ success: false, errors: validationResult.error.issues });
      return;
    }
    await this.createHandler.handle({ dto: validationResult.data, userId: userId! });
    res.status(201).json({ success: true });
  }

  async update(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id;
    const id = req.params.id as string;
    const validationResult = UpdateEntitySchema.safeParse(req.body);
    if (!validationResult.success) {
      res.status(400).json({ success: false, errors: validationResult.error.issues });
      return;
    }
    await this.updateHandler.handle({ entityId: id, dto: validationResult.data, userId: userId! });
    res.status(200).json({ success: true });
  }

  async delete(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id;
    const id = req.params.id as string;
    await this.deleteHandler.handle({ entityId: id, userId: userId! });
    res.status(204).send();
  }

  async publish(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id;
    const id = req.params.id as string;
    await this.publishHandler.handle({ entityId: id, userId: userId! });
    res.status(200).json({ success: true });
  }

  async archive(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id;
    const id = req.params.id as string;
    await this.archiveHandler.handle({ entityId: id, userId: userId! });
    res.status(200).json({ success: true });
  }

  async restore(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id;
    const id = req.params.id as string;
    await this.restoreHandler.handle({ entityId: id, userId: userId! });
    res.status(200).json({ success: true });
  }

  async merge(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id;
    const sourceId = req.body.sourceId as string;
    const targetId = req.body.targetId as string;
    await this.mergeHandler.handle({ sourceEntityId: sourceId, targetEntityId: targetId, userId: userId! });
    res.status(200).json({ success: true });
  }

  async addAlias(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id;
    const id = req.params.id as string;
    const alias = req.body.alias as string;
    await this.addAliasHandler.handle({ entityId: id, alias, userId: userId! });
    res.status(200).json({ success: true });
  }

  async removeAlias(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id;
    const id = req.params.id as string;
    const alias = req.body.alias as string;
    await this.removeAliasHandler.handle({ entityId: id, alias, userId: userId! });
    res.status(200).json({ success: true });
  }

  async createVersion(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id;
    const id = req.params.id as string;
    await this.createVersionHandler.handle({ entityId: id, userId: userId! });
    res.status(201).json({ success: true });
  }
}
