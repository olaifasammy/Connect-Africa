import { ExpansionRequestService, KnowledgeGapService } from '../../../../ai/public';
export declare class ArticleExpansionService {
    private readonly expansionService;
    private readonly knowledgeGapService;
    constructor(expansionService: ExpansionRequestService, knowledgeGapService: KnowledgeGapService);
    expandArticle(content: string, articleId: string): Promise<string>;
}
