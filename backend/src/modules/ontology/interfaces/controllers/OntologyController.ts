import { Request, Response } from 'express';
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
import { CreateOntologySchema } from '@modules/ontology/application/dto/OntologyValidationDto';

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
    private readonly getOntologyVersionQueryHandler: GetOntologyVersionQueryHandler
  ) {
    super();
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const validatedData = CreateOntologySchema.parse(req.body);
      const result = await this.createOntologyCommandHandler.handle(validatedData, req.user?.id, req.ip);
      res.status(201).json({ success: true, data: result });
    } catch (error: any) {
      this.handleError(res, error);
    }
  }

  // Ontology
  async update(req: Request, res: Response): Promise<void> {
    try {
      const command = { id: req.params.id as string, ...req.body };
      const result = await this.updateOntologyCommandHandler.handle(command, req.user?.id, req.ip);
      res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      this.handleError(res, error);
    }
  }

  async archive(req: Request, res: Response): Promise<void> {
    try {
      const command = { id: req.params.id as string };
      const result = await this.archiveOntologyCommandHandler.handle(command, req.user?.id, req.ip);
      res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      this.handleError(res, error);
    }
  }

  async get(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.getOntologyQueryHandler.handle({ id: req.params.id as string });
      res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      this.handleError(res, error);
    }
  }

  async list(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.listOntologiesQueryHandler.handle({});
      res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      this.handleError(res, error);
    }
  }

  async search(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.searchOntologyQueryHandler.handle({ term: req.query.q as string });
      res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      this.handleError(res, error);
    }
  }

  // Entity Types
  async createEntityType(req: Request, res: Response): Promise<void> {
    try {
      const command = { ontologyId: req.params.ontologyId as string, ...req.body };
      const result = await this.createEntityTypeCommandHandler.handle(command, req.user?.id, req.ip);
      res.status(201).json({ success: true, data: result });
    } catch (error: any) {
      this.handleError(res, error);
    }
  }

  async getEntityType(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.getEntityTypeQueryHandler.handle({ id: req.params.id as string });
      res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      this.handleError(res, error);
    }
  }

  async listEntityTypes(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.listEntityTypesQueryHandler.handle({ ontologyId: req.params.ontologyId as string });
      res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      this.handleError(res, error);
    }
  }

  // Relationship Types
  async createRelationshipType(req: Request, res: Response): Promise<void> {
    try {
      const command = { ontologyId: req.params.ontologyId as string, ...req.body };
      const result = await this.createRelationshipTypeCommandHandler.handle(command, req.user?.id, req.ip);
      res.status(201).json({ success: true, data: result });
    } catch (error: any) {
      this.handleError(res, error);
    }
  }

  async getRelationshipType(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.getRelationshipTypeQueryHandler.handle({ id: req.params.id as string });
      res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      this.handleError(res, error);
    }
  }

  async listRelationshipTypes(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.listRelationshipTypesQueryHandler.handle({ ontologyId: req.params.ontologyId as string });
      res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      this.handleError(res, error);
    }
  }

  // Versions
  async createVersion(req: Request, res: Response): Promise<void> {
    try {
      const command = { ontologyId: req.params.ontologyId as string, ...req.body };
      await this.createOntologyVersionCommandHandler.handle(command);
      res.status(201).json({ success: true });
    } catch (error: any) {
      this.handleError(res, error);
    }
  }

  async publishVersion(req: Request, res: Response): Promise<void> {
    try {
      const command = { id: req.params.id as string };
      await this.publishOntologyVersionCommandHandler.handle(command);
      res.status(200).json({ success: true });
    } catch (error: any) {
      this.handleError(res, error);
    }
  }

  async rollbackVersion(req: Request, res: Response): Promise<void> {
    try {
      const command = { id: req.params.id as string };
      await this.rollbackOntologyVersionCommandHandler.handle(command);
      res.status(200).json({ success: true });
    } catch (error: any) {
      this.handleError(res, error);
    }
  }

  async getVersion(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.getOntologyVersionQueryHandler.handle({ id: req.params.id as string });
      res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      this.handleError(res, error);
    }
  }
}

