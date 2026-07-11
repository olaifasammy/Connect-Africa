import { CreateArticleCommand } from '../commands/CreateArticleCommand';
import { IArticleRepository } from '../../domain/repositories/IArticleRepository';
import { Article } from '../../domain/entities/Article';
import { IAuditLogger } from '../../domain/interfaces/ArticleServices';

export class CreateArticleHandler {
  constructor(
    private readonly repository: IArticleRepository,
    private readonly auditLogger: IAuditLogger
  ) {}

  async handle(command: CreateArticleCommand): Promise<string> {
    const article = Article.create({
      title: command.title,
      summary: command.summary,
      content: command.content,
      authorId: command.authorId,
      language: command.language,
      slug: command.title.toLowerCase().replace(/ /g, '-') // Basic slugification
    });

    await this.repository.save(article);
    await this.auditLogger.log('ARTICLE_CREATED', { articleId: article.id.toString(), ...command });
    return article.id.toString();
  }
}
