"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchRoutes = void 0;
const express_1 = require("express");
const container_1 = require("../../../../bootstrap/container/container");
const SearchController_1 = require("../controllers/SearchController");
const AutocompleteController_1 = require("../controllers/AutocompleteController");
exports.SearchRoutes = (0, express_1.Router)();
const searchController = container_1.container.resolve(SearchController_1.SearchController);
const autocompleteController = container_1.container.resolve(AutocompleteController_1.AutocompleteController);
exports.SearchRoutes.get('/', searchController.search.bind(searchController));
exports.SearchRoutes.get('/autocomplete', autocompleteController.autocomplete.bind(autocompleteController));
//# sourceMappingURL=SearchRoutes.js.map