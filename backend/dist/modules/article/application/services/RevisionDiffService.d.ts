import { ArticleProps } from '../../domain/entities/Article';
export declare class RevisionDiffService {
    static diff(current: Omit<ArticleProps, 'version'>, previous: Omit<ArticleProps, 'version'>): Record<string, any>;
}
