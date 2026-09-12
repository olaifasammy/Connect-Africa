import { Request, Response } from 'express';
import { provide } from 'inversify-binding-decorators';
import { injectable } from 'inversify';

import { BaseController } from '@shared/interfaces/http/controllers/BaseController';

import { CreateOntologyCommandHandler } from '@modules/ontology/application/handlers/CreateOntologyCommandHandler';
import { UpdateOntologyCommandHandler } from '@modules/ontology/application/handlers/UpdateOntologyCommandHandler';
import { ArchiveOntologyCommandHandler } from '@modules/ontology/application/handlers/ArchiveOntologyCommandHandler';
import { GetOntologyQueryHandler } from '@modules/ontology/application/handlers/GetOntologyQueryHandler';
import { ListOntologiesQueryHandler } from '@modules/ontology/application/handlers/ListOntologiesQueryHandler';
import { SearchOntologyQueryHandler } from '@modules/ontology/application/handlers/SearchOntologyQueryHandler';

import { CreateEntityTypeCommandHandler } from '@modules/ontology/application/handlers/CreateEntityTypeCommandHandler';
import { GetEntityTypeQueryHandler } from '@modules/ontology/application/handlers/GetEntityTypeQueryHandler';
import { ListEntityTypesQueryHandler } from '@modules/ontology/application/handlers/ListEntityTypesQueryHandler';

import { CreateRelationshipTypeCommandHandler } from '@modules/ontology/application/handlers/CreateRelationshipTypeCommandHandler';
import { GetRelationshipTypeQueryHandler } from '@modules/ontology/application/handlers/GetRelationshipTypeQueryHandler';
import { ListRelationshipTypesQueryHandler } from '@modules/ontology/application/handlers/ListRelationshipTypesQueryHandler';

import { CreateOntologyVersionCommandHandler } from '@modules/ontology/application/handlers/CreateOntologyVersionCommandHandler';
import { PublishOntologyVersionCommandHandler } from '@modules/ontology/application/handlers/PublishOntologyVersionCommandHandler';
import { RollbackOntologyVersionCommandHandler } from '@modules/ontology/application/handlers/RollbackOntologyVersionCommandHandler';
import { GetOntologyVersionQueryHandler } from '@modules/ontology/application/handlers/GetOntologyVersionQueryHandler';

import { CreateEntityTypePropertyCommandHandler } from '@modules/ontology/application/handlers/CreateEntityTypePropertyCommandHandler';
import { UpdateEntityTypePropertyCommandHandler } from '@modules/ontology/application/handlers/UpdateEntityTypePropertyCommandHandler';
import { DeleteEntityTypePropertyCommandHandler } from '@modules/ontology/application/handlers/DeleteEntityTypePropertyCommandHandler';
import { GetEntityTypePropertyQueryHandler } from '@modules/ontology/application/handlers/GetEntityTypePropertyQueryHandler';
import { ListEntityTypePropertiesQueryHandler } from '@modules/ontology/application/handlers/ListEntityTypePropertiesQueryHandler';

@provide(OntologyController, true)
@injectable()
export class OntologyController extends BaseController {
  constructor(
    private readonly createOntologyCommandHandler: CreateOntologyCommandHandler,
    private readonly updateOntologyCommandHandler: UpdateOntologyCommandHandler,
    private readonly archiveOntologyCommandHandler: ArchiveOntologyCommandHandler,

    private readonly getOntologyQueryHandler: GetOntologyQueryHandler,
    private readonly listOntologiesQueryHandler: ListOntologiesQueryHandler,
    private readonly searchOntologyQueryHandler: SearchOntologyQueryHandler,

    private readonly createEntityTypeCommandHandler: CreateEntityTypeCommandHandler,
    private readonly getEntityTypeQueryHandler: GetEntityTypeQueryHandler,
    private readonly listEntityTypesQueryHandler: ListEntityTypesQueryHandler,

    private readonly createRelationshipTypeCommandHandler: CreateRelationshipTypeCommandHandler,
    private readonly getRelationshipTypeQueryHandler: GetRelationshipTypeQueryHandler,
    private readonly listRelationshipTypesQueryHandler: ListRelationshipTypesQueryHandler,

    private readonly createOntologyVersionCommandHandler: CreateOntologyVersionCommandHandler,
    private readonly publishOntologyVersionCommandHandler: PublishOntologyVersionCommandHandler,
    private readonly rollbackOntologyVersionCommandHandler: RollbackOntologyVersionCommandHandler,
    private readonly getOntologyVersionQueryHandler: GetOntologyVersionQueryHandler,

    private readonly createEntityTypePropertyCommandHandler: CreateEntityTypePropertyCommandHandler,
    private readonly updateEntityTypePropertyCommandHandler: UpdateEntityTypePropertyCommandHandler,
    private readonly deleteEntityTypePropertyCommandHandler: DeleteEntityTypePropertyCommandHandler,
    private readonly getEntityTypePropertyQueryHandler: GetEntityTypePropertyQueryHandler,
    private readonly listEntityTypePropertiesQueryHandler: ListEntityTypePropertiesQueryHandler,
  ) {
    super();
  }

  async create(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const result =
        await this.createOntologyCommandHandler.handle(
          req.body,
          req.user?.id,
          req.ip,
        );

      res.status(201).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      this.handleError(res, error);
    }
  }

  async update(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const command = {
        id: req.params.id as string,
        name: req.body.name,
        description: req.body.description,
      };

      const result =
        await this.updateOntologyCommandHandler.handle(
          command,
          req.user?.id,
          req.ip,
        );

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      this.handleError(res, error);
    }
  }

  async archive(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const command = {
        id: req.params.id as string,
      };

      const result =
        await this.archiveOntologyCommandHandler.handle(
          command,
          req.user?.id,
          req.ip,
        );

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      this.handleError(res, error);
    }
  }

  async get(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const result =
        await this.getOntologyQueryHandler.handle({
          id: req.params.id as string,
        });

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      this.handleError(res, error);
    }
  }

  async list(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const page = Number(req.query.page);
      const limit = Number(req.query.limit);

      const offset =
        (page - 1) * limit;

      const result =
        await this.listOntologiesQueryHandler.handle({
          limit,
          offset,
        });

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      this.handleError(res, error);
    }
  }

  async search(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const term =
        typeof req.query.q === 'string'
          ? req.query.q
          : '';

      const result =
        await this.searchOntologyQueryHandler.handle({
          term,
        });

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      this.handleError(res, error);
    }
  }

  async createEntityType(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const command = {
        ontologyId:
          req.params.ontologyId as string,
        name: req.body.name,
        description: req.body.description,
      };

      const result =
        await this.createEntityTypeCommandHandler.handle(
          command,
          req.user?.id,
          req.ip,
        );

      res.status(201).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      this.handleError(res, error);
    }
  }

  async getEntityType(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const result =
        await this.getEntityTypeQueryHandler.handle({
          id: req.params.id as string,
        });

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      this.handleError(res, error);
    }
  }

  async listEntityTypes(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const result =
        await this.listEntityTypesQueryHandler.handle({
          ontologyId:
            req.params.ontologyId as string,
        });

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      this.handleError(res, error);
    }
  }

  async createRelationshipType(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const command = {
        ontologyId:
          req.params.ontologyId as string,
        name: req.body.name,
        description: req.body.description,
        sourceEntityTypeId:
          req.body.sourceEntityTypeId,
        targetEntityTypeId:
          req.body.targetEntityTypeId,
      };

      const result =
        await this.createRelationshipTypeCommandHandler.handle(
          command,
          req.user?.id,
          req.ip,
        );

      res.status(201).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      this.handleError(res, error);
    }
  }

  async getRelationshipType(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const result =
        await this.getRelationshipTypeQueryHandler.handle({
          id: req.params.id as string,
        });

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      this.handleError(res, error);
    }
  }

  async listRelationshipTypes(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const result =
        await this.listRelationshipTypesQueryHandler.handle({
          ontologyId:
            req.params.ontologyId as string,
        });

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      this.handleError(res, error);
    }
  }

  async createEntityTypeProperty(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const command = {
        entityTypeId:
          req.params.entityTypeId as string,
        name: req.body.name,
        dataType: req.body.dataType,
        minCardinality:
          req.body.minCardinality,
        maxCardinality:
          req.body.maxCardinality,
        required:
          req.body.required,
      };

      const result =
        await this.createEntityTypePropertyCommandHandler.handle(
          command,
        );

      res.status(201).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      this.handleError(res, error);
    }
  }

  async getEntityTypeProperty(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const result =
        await this.getEntityTypePropertyQueryHandler.handle({
          id: req.params.id as string,
        });

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      this.handleError(res, error);
    }
  }

  async listEntityTypeProperties(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const result =
        await this.listEntityTypePropertiesQueryHandler.handle({
          entityTypeId:
            req.params.entityTypeId as string,
        });

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      this.handleError(res, error);
    }
  }

  async updateEntityTypeProperty(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const command = {
        id: req.params.id as string,
        name: req.body.name,
        dataType: req.body.dataType,
        minCardinality:
          req.body.minCardinality,
        maxCardinality:
          req.body.maxCardinality,
        required:
          req.body.required,
      };

      const result =
        await this.updateEntityTypePropertyCommandHandler.handle(
          command,
        );

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      this.handleError(res, error);
    }
  }

  async deleteEntityTypeProperty(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      await this.deleteEntityTypePropertyCommandHandler.handle({
        id: req.params.id as string,
      });

      res.status(204).send();
    } catch (error: any) {
      this.handleError(res, error);
    }
  }

  async createVersion(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const command = {
        ontologyId:
          req.params.ontologyId as string,
      };

      const result =
        await this.createOntologyVersionCommandHandler.handle(
          command,
        );

      res.status(201).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      this.handleError(res, error);
    }
  }

  async publishVersion(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const command = {
        id: req.params.id as string,
      };

      await this.publishOntologyVersionCommandHandler.handle(
        command,
      );

      res.status(200).json({
        success: true,
      });
    } catch (error: any) {
      this.handleError(res, error);
    }
  }

  async rollbackVersion(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const command = {
        id: req.params.id as string,
      };

      await this.rollbackOntologyVersionCommandHandler.handle(
        command,
      );

      res.status(200).json({
        success: true,
      });
    } catch (error: any) {
      this.handleError(res, error);
    }
  }

  async getVersion(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const result =
        await this.getOntologyVersionQueryHandler.handle({
          id: req.params.id as string,
        });

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      this.handleError(res, error);
    }
  }
}