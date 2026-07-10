import { Request, Response } from 'express';
import { BaseController } from '../../../../shared/interfaces/http/controllers/BaseController';
import { CreateOntologyCommandHandler } from '../../../ontology/application/handlers/CreateOntologyCommandHandler';
export declare class OntologyController extends BaseController {
    private readonly createOntologyCommandHandler;
    constructor(createOntologyCommandHandler: CreateOntologyCommandHandler);
    create(req: Request, res: Response): Promise<void>;
    protected execute(req: Request, res: Response): Promise<void>;
}
