"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Article = void 0;
const AggregateRoot_1 = require("../../../../shared/domain/AggregateRoot");
class Article extends AggregateRoot_1.AggregateRoot {
    constructor(props, id) {
        super(props, id);
    }
}
exports.Article = Article;
//# sourceMappingURL=Article.js.map