import { Revision } from '../../domain/entities/Revision';
export interface IRevisionRepository {
    save(revision: Revision): Promise<void>;
    findByArticleId(articleId: string): Promise<Revision[]>;
    getLatestByArticleId(articleId: string): Promise<Revision | null>;
}
