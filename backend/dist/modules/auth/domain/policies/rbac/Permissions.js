"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Permission = void 0;
var Permission;
(function (Permission) {
    Permission["USER_READ"] = "user:read";
    Permission["USER_WRITE"] = "user:write";
    Permission["MFA_MANAGE"] = "mfa:manage";
    Permission["SESSION_MANAGE"] = "session:manage";
    Permission["ONTOLOGY_CREATE"] = "ontology:create";
    Permission["GRAPH_READ"] = "graph:read";
    Permission["GRAPH_WRITE"] = "graph:write";
    Permission["RELATIONSHIP_WRITE"] = "relationship:write";
    Permission["ARTICLE_CREATE"] = "article:create";
    Permission["ARTICLE_UPDATE"] = "article:update";
    Permission["ARTICLE_DELETE"] = "article:delete";
    Permission["ARTICLE_PUBLISH"] = "article:publish";
    Permission["ARTICLE_APPROVE"] = "article:approve";
    Permission["SOURCE_CREATE"] = "source:create";
    Permission["SOURCE_UPDATE"] = "source:update";
    Permission["SOURCE_DELETE"] = "source:delete";
    Permission["SOURCE_READ"] = "source:read";
})(Permission || (exports.Permission = Permission = {}));
//# sourceMappingURL=Permissions.js.map