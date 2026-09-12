import { provide } from 'inversify-binding-decorators';
import { injectable } from 'inversify';
import { Request, Response } from 'express';

import { BaseController } from '@shared/interfaces/http/controllers/BaseController';

import {
  CreateRelationshipCommand,
  UpdateRelationshipCommand,
  DeleteRelationshipCommand,
} from '../../application/commands/RelationshipCommands';

import {
  CreateRelationshipSchema,
  UpdateRelationshipSchema,
  ListRelationshipQuerySchema,
} from '../../application/validators/RelationshipValidators';

import { CreateRelationshipHandler } from '../../application/handlers/CreateRelationshipHandler';
import { GetRelationshipByIdHandler } from '../../application/handlers/GetRelationshipByIdHandler';
import { ListRelationshipsHandler } from '../../application/handlers/ListRelationshipsHandler';
import { UpdateRelationshipHandler } from '../../application/handlers/UpdateRelationshipHandler';
import { DeleteRelationshipHandler } from '../../application/handlers/DeleteRelationshipHandler';

import {
  GetRelationshipQuery,
  ListRelationshipsQuery,
} from '../../application/queries/RelationshipQueries';

import {
  RelationshipConflictError,
  RelationshipNotFoundError,
  RelationshipValidationError,
} from '../../domain/errors/RelationshipErrors';

@provide(RelationshipController, true)
@injectable()
export class RelationshipController
  extends BaseController
{
  constructor(
    private readonly createHandler:
      CreateRelationshipHandler,

    private readonly getByIdHandler:
      GetRelationshipByIdHandler,

    private readonly listHandler:
      ListRelationshipsHandler,

    private readonly updateHandler:
      UpdateRelationshipHandler,

    private readonly deleteHandler:
      DeleteRelationshipHandler,
  ) {
    super();
  }

  async create(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const userId = req.user?.id;

      if (!userId) {
        res.status(401).json({
          success: false,
          errors: [
            {
              code: 'AUTHENTICATION_REQUIRED',
              message:
                'Authenticated user is required.',
            },
          ],
        });
        return;
      }

      const validatedData =
        CreateRelationshipSchema.parse(
          req.body,
        );

      const command =
        new CreateRelationshipCommand(
          validatedData.sourceEntityId,
          validatedData.targetEntityId,
          validatedData.relationshipTypeId,
          userId,
        );

      const relationshipId =
        await this.createHandler.handle(
          command,
        );

      res.status(201).json({
        success: true,
        data: {
          id: relationshipId,
          message: 'Relationship created',
        },
      });
    } catch (error) {
      this.handleRelationshipError(
        res,
        error,
      );
    }
  }

  async get(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const id = req.params.id as string;

      const result =
        await this.getByIdHandler.handle(
          new GetRelationshipQuery(id),
        );

      if (!result) {
        res.status(404).json({
          success: false,
          errors: [
            {
              code:
                'RELATIONSHIP_NOT_FOUND',
              message:
                'Relationship not found',
            },
          ],
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      this.handleRelationshipError(
        res,
        error,
      );
    }
  }

  async list(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const query =
        ListRelationshipQuerySchema.parse(
          req.query,
        );

      const result =
        await this.listHandler.handle(
          new ListRelationshipsQuery(
            query.limit,
            query.offset,
          ),
        );

      res.status(200).json({
        success: true,
        data: result,
        pagination: {
          limit: query.limit,
          offset: query.offset,
          count: result.length,
        },
      });
    } catch (error) {
      this.handleRelationshipError(
        res,
        error,
      );
    }
  }

  async update(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const userId = req.user?.id;

      if (!userId) {
        res.status(401).json({
          success: false,
          errors: [
            {
              code:
                'AUTHENTICATION_REQUIRED',
              message:
                'Authenticated user is required.',
            },
          ],
        });
        return;
      }

      const id = req.params.id as string;

      const validatedData =
        UpdateRelationshipSchema.parse(
          req.body,
        );

      await this.updateHandler.handle(
        new UpdateRelationshipCommand(
          id,
          validatedData.relationshipTypeId,
        ),
        userId,
      );

      res.status(200).json({
        success: true,
        data: {
          message: 'Relationship updated',
        },
      });
    } catch (error) {
      this.handleRelationshipError(
        res,
        error,
      );
    }
  }

  async delete(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const userId = req.user?.id;

      if (!userId) {
        res.status(401).json({
          success: false,
          errors: [
            {
              code:
                'AUTHENTICATION_REQUIRED',
              message:
                'Authenticated user is required.',
            },
          ],
        });
        return;
      }

      const id = req.params.id as string;

      await this.deleteHandler.handle(
        new DeleteRelationshipCommand(id),
        userId,
      );

      res.status(204).send();
    } catch (error) {
      this.handleRelationshipError(
        res,
        error,
      );
    }
  }

  private handleRelationshipError(
    res: Response,
    error: unknown,
  ): void {
    if (
      error instanceof
      RelationshipValidationError
    ) {
      res.status(400).json({
        success: false,
        errors: [
          {
            code: error.code,
            message: error.message,
          },
        ],
      });
      return;
    }

    if (
      error instanceof
      RelationshipNotFoundError
    ) {
      res.status(404).json({
        success: false,
        errors: [
          {
            code: error.code,
            message: error.message,
          },
        ],
      });
      return;
    }

    if (
      error instanceof
      RelationshipConflictError
    ) {
      res.status(409).json({
        success: false,
        errors: [
          {
            code: error.code,
            message: error.message,
          },
        ],
      });
      return;
    }

    this.handleError(
      res,
      error instanceof Error
        ? error
        : new Error(
            'Unknown relationship controller error.',
          ),
    );
  }
}