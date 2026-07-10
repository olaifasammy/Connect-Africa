"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OntologyController = void 0;
const BaseController_1 = require("../../../../shared/interfaces/http/controllers/BaseController");
const OntologyValidationDto_1 = require("../../../ontology/application/dto/OntologyValidationDto");
class OntologyController extends BaseController_1.BaseController {
    createOntologyCommandHandler;
    constructor(createOntologyCommandHandler) {
        super();
        this.createOntologyCommandHandler = createOntologyCommandHandler;
    }
    // Middleware would be applied in routes, but adding it here for reference in the controller if needed by architecture
    async create(req, res) {
        try {
            // Authorization logic to be applied at route level
            const validatedData = OntologyValidationDto_1.CreateOntologySchema.parse(req.body);
            const result = await this.createOntologyCommandHandler.handle(validatedData);
            res.status(201).json({ success: true, data: result });
        }
        catch (error) {
            this.handleError(res, error);
        }
    }
    async execute(req, res) {
        // Explicit handlers preferred; maintain for backward compatibility if needed by BaseController
    }
}
exports.OntologyController = OntologyController;
//# sourceMappingURL=OntologyController.js.map