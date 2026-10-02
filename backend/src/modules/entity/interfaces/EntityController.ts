import { provide } from 'inversify-binding-decorators';
import { Request, Response } from 'express';
import { injectable } from 'inversify';

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
import { GetEntityQueryHandler } from '@modules/entity/application/handlers/GetEntityQueryHandler';
import { GetEntityByIdentifierQueryHandler } from '@modules/entity/application/handlers/GetEntityByIdentifierQueryHandler';
import { GetEntityBySlugQueryHandler } from '@modules/entity/application/handlers/GetEntityBySlugQueryHandler';
import { ListEntitiesQueryHandler } from '@modules/entity/application/handlers/ListEntitiesQueryHandler';
import { ListEntitiesQuery } from '@modules/entity/application/queries/ListEntitiesQuery';
import { GetEntitySchemaQueryHandler } from '@modules/entity/application/handlers/GetEntitySchemaQueryHandler';
import { GetEntitySchemaQuery } from '@modules/entity/application/queries/GetEntitySchemaQuery';

import { SearchEntitiesQueryHandler } from '@modules/entity/application/handlers/SearchEntitiesQueryHandler';
import { ListAliasesQueryHandler } from '@modules/entity/application/handlers/ListAliasesQueryHandler';
import { GetEntityVersionQueryHandler } from '@modules/entity/application/handlers/GetEntityVersionQueryHandler';
import { SubmitEntityForReviewCommandHandler } from '@modules/entity/application/handlers/SubmitEntityForReviewCommandHandler';
import { ApproveEntityCommandHandler } from '@modules/entity/application/handlers/ApproveEntityCommandHandler';
import { RejectEntityCommandHandler } from '@modules/entity/application/handlers/RejectEntityCommandHandler';
import { SubmitEntityForReviewCommand } from '@modules/entity/application/commands/SubmitEntityForReviewCommand';
import { ApproveEntityCommand } from '@modules/entity/application/commands/ApproveEntityCommand';
import { RejectEntityCommand } from '@modules/entity/application/commands/RejectEntityCommand';
import { ResolveEntityDuplicateCommand } from '@modules/entity/application/commands/ResolveEntityDuplicateCommand';
import { EntitySearchRequest } from '@modules/entity/application/dto/EntitySearchRequest';

import { GetEntityDashboardSummaryQuery } from '@modules/entity/application/queries/GetEntityDashboardSummaryQuery';
import { GetEntityDashboardSummaryQueryHandler } from '@modules/entity/application/handlers/GetEntityDashboardSummaryQueryHandler';
import { GetQualityDistributionQuery } from '@modules/entity/application/queries/GetQualityDistributionQuery';
import { GetQualityDistributionQueryHandler } from '@modules/entity/application/handlers/GetQualityDistributionQueryHandler';
import { GetVerificationQueueQuery } from '@modules/entity/application/queries/GetVerificationQueueQuery';
import { GetVerificationQueueQueryHandler } from '@modules/entity/application/handlers/GetVerificationQueueQueryHandler';
import { GetEntityDuplicatesQuery } from '@modules/entity/application/queries/GetEntityDuplicatesQuery';
import { GetEntityDuplicatesQueryHandler } from '@modules/entity/application/handlers/GetEntityDuplicatesQueryHandler';
import { ResolveEntityDuplicateCommandHandler } from '@modules/entity/application/handlers/ResolveEntityDuplicateCommandHandler';

import { GetEntityActivityQuery } from '@modules/entity/application/queries/GetEntityActivityQuery';
import { GetEntityActivityQueryHandler } from '@modules/entity/application/handlers/GetEntityActivityQueryHandler';
import { ExportEntitiesQuery } from '@modules/entity/application/queries/ExportEntitiesQuery';
import { ExportEntitiesQueryHandler } from '@modules/entity/application/handlers/ExportEntitiesQueryHandler';
import { ImportEntitiesCommand } from '@modules/entity/application/commands/ImportEntitiesCommand';
import { ImportEntitiesCommandHandler } from '@modules/entity/application/handlers/ImportEntitiesCommandHandler';

import {
  PaginationRequest,
} from '@shared/application/pagination/PaginationTypes';

@provide(EntityController, true)
@injectable()
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
    private readonly createVersionHandler: CreateEntityVersionCommandHandler,
    private readonly getHandler: GetEntityQueryHandler,
    private readonly getByIdentifierHandler: GetEntityByIdentifierQueryHandler,
    private readonly getBySlugHandler: GetEntityBySlugQueryHandler,
    private readonly listHandler: ListEntitiesQueryHandler,
    private readonly searchHandler: SearchEntitiesQueryHandler,
    private readonly listAliasesHandler: ListAliasesQueryHandler,
    private readonly getVersionHandler: GetEntityVersionQueryHandler,
    private readonly submitForReviewHandler: SubmitEntityForReviewCommandHandler,
    private readonly approveHandler: ApproveEntityCommandHandler,
    private readonly rejectHandler: RejectEntityCommandHandler,
    private readonly getDashboardSummaryHandler: GetEntityDashboardSummaryQueryHandler,
    private readonly getQualityDistributionHandler: GetQualityDistributionQueryHandler,
    private readonly getVerificationQueueHandler: GetVerificationQueueQueryHandler,
    private readonly getDuplicatesHandler: GetEntityDuplicatesQueryHandler,
    private readonly resolveDuplicateHandler: ResolveEntityDuplicateCommandHandler,
    private readonly getEntityActivityHandler: GetEntityActivityQueryHandler,
    private readonly exportEntitiesHandler: ExportEntitiesQueryHandler,
    private readonly importEntitiesHandler: ImportEntitiesCommandHandler,
    private readonly getSchemaHandler: GetEntitySchemaQueryHandler,
  ) {}

  async get(
    req: Request,
    res: Response,
  ): Promise<void> {
    const id = req.params.id as string;

    const result =
      await this.getHandler.handle({
        entityId: id,
      });

    res.status(200).json({
      success: true,
      data: result,
    });
  }

  async getByIdentifier(
    req: Request,
    res: Response,
  ): Promise<void> {
    const identifier =
      req.params.identifier as string;

    const result =
      await this.getByIdentifierHandler.handle({
        identifier,
      });

    res.status(200).json({
      success: true,
      data: result,
    });
  }

  async getBySlug(
    req: Request,
    res: Response,
  ): Promise<void> {
    const slug = req.params.slug as string;

    const result =
      await this.getBySlugHandler.handle({
        slug,
      });

    res.status(200).json({
      success: true,
      data: result,
    });
  }

  async list(
    req: Request,
    res: Response,
  ): Promise<void> {
    const query = req.query as unknown as {
      strategy: 'offset' | 'cursor';
      page?: number;
      limit: number;
      cursor?: string;
    };

    let pagination: PaginationRequest;

    if (query.strategy === 'cursor') {
      pagination = {
        strategy: 'cursor',
        limit: query.limit,
        ...(query.cursor
          ? { cursor: query.cursor }
          : {}),
      };
    } else {
      pagination = {
        strategy: 'offset',
        page: query.page ?? 1,
        limit: query.limit,
      };
    }

    const result =
      await this.listHandler.handle(
        new ListEntitiesQuery(
          pagination,
        ),
      );

    res.status(200).json({
      success: true,
      data: result,
    });
  }

  async search(
    req: Request,
    res: Response,
  ): Promise<void> {
    const { query } =
      req.body as EntitySearchRequest;

    const result =
      await this.searchHandler.handle({
        term: query,
      });

    res.status(200).json({
      success: true,
      data: result,
    });
  }

  async listAliases(
    req: Request,
    res: Response,
  ): Promise<void> {
    const id = req.params.id as string;

    const result =
      await this.listAliasesHandler.handle({
        entityId: id,
      });

    res.status(200).json({
      success: true,
      data: result,
    });
  }

  async getVersion(
    req: Request,
    res: Response,
  ): Promise<void> {
    const id = req.params.id as string;
    const versionId =
      req.params.versionId as string;

    const result =
      await this.getVersionHandler.handle({
        entityId: id,
        versionId,
      });

    res.status(200).json({
      success: true,
      data: result,
    });
  }

  async create(
    req: Request,
    res: Response,
  ): Promise<void> {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({
        success: false,
        errors: [
          {
            code: 'UNAUTHORIZED',
            message:
              'User authentication is required.',
          },
        ],
      });

      return;
    }

    await this.createHandler.handle({
      dto: req.body,
      userId,
    });

    res.status(201).json({
      success: true,
    });
  }

  async update(
    req: Request,
    res: Response,
  ): Promise<void> {
    const userId = req.user?.id;
    const id = req.params.id as string;

    if (!userId) {
      res.status(401).json({
        success: false,
        errors: [
          {
            code: 'UNAUTHORIZED',
            message:
              'User authentication is required.',
          },
        ],
      });

      return;
    }

    await this.updateHandler.handle({
      entityId: id,
      dto: req.body,
      userId,
    });

    res.status(200).json({
      success: true,
    });
  }

  async delete(
    req: Request,
    res: Response,
  ): Promise<void> {
    const userId = req.user?.id;
    const id = req.params.id as string;

    if (!userId) {
      res.status(401).json({
        success: false,
        errors: [
          {
            code: 'UNAUTHORIZED',
            message:
              'User authentication is required.',
          },
        ],
      });

      return;
    }

    await this.deleteHandler.handle({
      entityId: id,
      userId,
    });

    res.status(204).send();
  }

  async publish(
    req: Request,
    res: Response,
  ): Promise<void> {
    const userId = req.user?.id;
    const id = req.params.id as string;

    if (!userId) {
      res.status(401).json({
        success: false,
        errors: [
          {
            code: 'UNAUTHORIZED',
            message:
              'User authentication is required.',
          },
        ],
      });

      return;
    }

    await this.publishHandler.handle({
      entityId: id,
      userId,
    });

    res.status(200).json({
      success: true,
    });
  }

  async archive(
    req: Request,
    res: Response,
  ): Promise<void> {
    const userId = req.user?.id;
    const id = req.params.id as string;

    if (!userId) {
      res.status(401).json({
        success: false,
        errors: [
          {
            code: 'UNAUTHORIZED',
            message:
              'User authentication is required.',
          },
        ],
      });

      return;
    }

    await this.archiveHandler.handle({
      entityId: id,
      userId,
    });

    res.status(200).json({
      success: true,
    });
  }

  async restore(
    req: Request,
    res: Response,
  ): Promise<void> {
    const userId = req.user?.id;
    const id = req.params.id as string;

    if (!userId) {
      res.status(401).json({
        success: false,
        errors: [
          {
            code: 'UNAUTHORIZED',
            message:
              'User authentication is required.',
          },
        ],
      });

      return;
    }

    await this.restoreHandler.handle({
      entityId: id,
      userId,
    });

    res.status(200).json({
      success: true,
    });
  }

  async merge(
    req: Request,
    res: Response,
  ): Promise<void> {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({
        success: false,
        errors: [
          {
            code: 'UNAUTHORIZED',
            message:
              'User authentication is required.',
          },
        ],
      });

      return;
    }

    await this.mergeHandler.handle({
      sourceEntityId: req.body.sourceId,
      targetEntityId: req.body.targetId,
      userId,
    });

    res.status(200).json({
      success: true,
    });
  }

  async addAlias(
    req: Request,
    res: Response,
  ): Promise<void> {
    const userId = req.user?.id;
    const id = req.params.id as string;

    if (!userId) {
      res.status(401).json({
        success: false,
        errors: [
          {
            code: 'UNAUTHORIZED',
            message:
              'User authentication is required.',
          },
        ],
      });

      return;
    }

    await this.addAliasHandler.handle({
      entityId: id,
      alias: req.body.alias,
      userId,
    });

    res.status(200).json({
      success: true,
    });
  }

  async removeAlias(
    req: Request,
    res: Response,
  ): Promise<void> {
    const userId = req.user?.id;
    const id = req.params.id as string;

    if (!userId) {
      res.status(401).json({
        success: false,
        errors: [
          {
            code: 'UNAUTHORIZED',
            message:
              'User authentication is required.',
          },
        ],
      });

      return;
    }

    await this.removeAliasHandler.handle({
      entityId: id,
      alias: req.body.alias,
      userId,
    });

    res.status(200).json({
      success: true,
    });
  }

  async createVersion(
    req: Request,
    res: Response,
  ): Promise<void> {
    const userId = req.user?.id;
    const id = req.params.id as string;

    if (!userId) {
      res.status(401).json({
        success: false,
        errors: [
          {
            code: 'UNAUTHORIZED',
            message:
              'User authentication is required.',
          },
        ],
      });

      return;
    }

    await this.createVersionHandler.handle({
      entityId: id,
      userId,
    });

    res.status(201).json({
      success: true,
    });
  }

  async submitForReview(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id;
    const id = req.params.id as string;

    if (!userId) {
      res.status(401).json({
        success: false,
        errors: [{ code: 'UNAUTHORIZED', message: 'User authentication is required.' }],
      });
      return;
    }

    await this.submitForReviewHandler.handle(new SubmitEntityForReviewCommand(id, userId));
    res.status(200).json({ success: true });
  }

  async approve(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id;
    const id = req.params.id as string;

    if (!userId) {
      res.status(401).json({
        success: false,
        errors: [{ code: 'UNAUTHORIZED', message: 'User authentication is required.' }],
      });
      return;
    }

    await this.approveHandler.handle(new ApproveEntityCommand(id, userId));
    res.status(200).json({ success: true });
  }

  async reject(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id;
    const id = req.params.id as string;

    if (!userId) {
      res.status(401).json({
        success: false,
        errors: [{ code: 'UNAUTHORIZED', message: 'User authentication is required.' }],
      });
      return;
    }

    await this.rejectHandler.handle(new RejectEntityCommand(id, userId));
    res.status(200).json({ success: true });
  }

  async getDashboardSummary(req: Request, res: Response): Promise<void> {
    const result = await this.getDashboardSummaryHandler.handle(
      new GetEntityDashboardSummaryQuery()
    );

    res.status(200).json({
      success: true,
      data: result,
    });
  }

  async getQualityDistribution(req: Request, res: Response): Promise<void> {
    const result = await this.getQualityDistributionHandler.handle(
      new GetQualityDistributionQuery()
    );

    res.status(200).json({
      success: true,
      data: result,
    });
  }

  async getVerificationQueue(req: Request, res: Response): Promise<void> {
    const query = req.query as unknown as {
      strategy?: 'offset' | 'cursor';
      page?: number;
      limit?: number;
      cursor?: string;
    };

    let pagination: PaginationRequest;

    if (query.strategy === 'cursor') {
      pagination = {
        strategy: 'cursor',
        limit: query.limit ? Number(query.limit) : 20,
        ...(query.cursor ? { cursor: query.cursor } : {}),
      };
    } else {
      pagination = {
        strategy: 'offset',
        page: query.page ? Number(query.page) : 1,
        limit: query.limit ? Number(query.limit) : 20,
      };
    }

    const result = await this.getVerificationQueueHandler.handle(
      new GetVerificationQueueQuery(pagination)
    );

    res.status(200).json({
      success: true,
      data: result,
    });
  }

  async getDuplicates(req: Request, res: Response): Promise<void> {
    const threshold = req.query.threshold ? Number(req.query.threshold) : 0.4;
    const result = await this.getDuplicatesHandler.handle(
      new GetEntityDuplicatesQuery(threshold)
    );

    res.status(200).json({
      success: true,
      data: result,
    });
  }

  async resolveDuplicate(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({
        success: false,
        errors: [{ code: 'UNAUTHORIZED', message: 'User authentication is required.' }],
      });
      return;
    }

    const { sourceEntityId, duplicateEntityId, action } = req.body;

    if (!sourceEntityId || !duplicateEntityId || !action) {
      res.status(400).json({
        success: false,
        errors: [{ code: 'BAD_REQUEST', message: 'Missing required parameters.' }],
      });
      return;
    }

    if (action !== 'MERGE' && action !== 'DISMISS') {
      res.status(400).json({
        success: false,
        errors: [{ code: 'BAD_REQUEST', message: 'Invalid action.' }],
      });
      return;
    }

    await this.resolveDuplicateHandler.handle(
      new ResolveEntityDuplicateCommand(sourceEntityId, duplicateEntityId, action),
      userId,
      req.ip || ''
    );

    res.status(200).json({
      success: true,
    });
  }

  async getActivity(req: Request, res: Response): Promise<void> {
    const limit = req.query.limit ? Number(req.query.limit) : 20;
    const result = await this.getEntityActivityHandler.handle(
      new GetEntityActivityQuery(limit)
    );

    res.status(200).json({
      success: true,
      data: result,
    });
  }

  async exportEntities(req: Request, res: Response): Promise<void> {
    const format = (req.query.format as 'json' | 'csv') || 'json';
    const status = req.query.status as string | undefined;
    const type = req.query.type as string | undefined;

    const result = await this.exportEntitiesHandler.handle(
      new ExportEntitiesQuery(format, status, type)
    );

    res.setHeader('Content-Type', result.contentType);
    res.setHeader('Content-Disposition', `attachment; filename="${result.fileName}"`);
    res.status(200).send(result.data);
  }

  async importEntities(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({
        success: false,
        errors: [{ code: 'UNAUTHORIZED', message: 'User authentication is required.' }],
      });
      return;
    }

    const items = req.body.items || req.body;
    if (!Array.isArray(items)) {
      res.status(400).json({
        success: false,
        errors: [{ code: 'BAD_REQUEST', message: 'Invalid payload: items array is required.' }],
      });
      return;
    }

    const result = await this.importEntitiesHandler.handle(
      new ImportEntitiesCommand(items),
      userId,
      req.ip || ''
    );

    res.status(200).json({
      success: true,
      data: result,
    });
  }


  async getSchema(req: Request, res: Response): Promise<void> {
    const result = await this.getSchemaHandler.handle(new GetEntitySchemaQuery());
    res.status(200).json({
      success: true,
      data: result,
    });
  }

}