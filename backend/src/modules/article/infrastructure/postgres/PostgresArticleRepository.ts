import { provide } from 'inversify-binding-decorators';
import { injectable } from 'inversify';

import {
  PostgresProvider,
} from '@shared/infrastructure/database/PostgresProvider';

import {
  IArticleRepository,
} from '../../domain/repositories/IArticleRepository';

import {
  Article,
  ArticleProps,
} from '../../domain/entities/Article';

import {
  UniqueEntityId,
} from '@shared/domain/UniqueEntityId';

import {
  ArticleStatus,
} from '../../domain/enums/ArticleStatus';

import {
  ArticleConflictError,
} from '../../domain/errors/ArticleDomainErrors';

import {
  ArticleSeo,
} from '../../domain/value-objects/ArticleSeo';

import {
  EntityLink,
} from '../../domain/value-objects/EntityLink';

import {
  RelationshipLink,
} from '../../domain/value-objects/RelationshipLink';

import {
  Citation,
} from '../../domain/value-objects/Citation';

import {
  MediaLink,
} from '../../domain/value-objects/MediaLink';

import {
  ArticleTag,
  ArticleCategory,
} from '../../domain/value-objects/Taxonomy';

interface ArticleRow {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  language: string;
  status: string;
  author_id: string;
  created_at: Date | string;
  updated_at: Date | string;
  published_at: Date | string | null;
  version: number | string;
  entity_links: unknown;
  relationship_links: unknown;
  citations: unknown;
  media_links: unknown;
  tags: unknown;
  categories: unknown;
  seo: unknown;
}

@provide(
  'IArticleRepository',
  true,
)
@injectable()
export class PostgresArticleRepository
  implements IArticleRepository
{
  constructor(
    private readonly provider: PostgresProvider,
  ) {}

  async findById(
    id: UniqueEntityId,
  ): Promise<Article | null> {
    const result =
      await this.provider.query<ArticleRow>(
        `
          SELECT *
          FROM articles
          WHERE id = $1
          LIMIT 1
        `,
        [id.toString()],
      );

    if (
      result.rows.length === 0
    ) {
      return null;
    }

    return this.mapRowToArticle(
      result.rows[0],
    );
  }

  async findBySlug(
    slug: string,
  ): Promise<Article | null> {
    const result =
      await this.provider.query<ArticleRow>(
        `
          SELECT *
          FROM articles
          WHERE slug = $1
          LIMIT 1
        `,
        [slug],
      );

    if (
      result.rows.length === 0
    ) {
      return null;
    }

    return this.mapRowToArticle(
      result.rows[0],
    );
  }

  async save(
    article: Article,
  ): Promise<void> {
    const entityLinks =
      article.entityLinks.map(
        (link) => ({
          entityId:
            link.entityId.toString(),
        }),
      );

    const relationshipLinks =
      article.relationshipLinks.map(
        (link) => ({
          relationshipId:
            link.relationshipId.toString(),
        }),
      );

    const citations =
      article.citations.map(
        (citation) => ({
          articleId:
            citation.articleId.toString(),
          sourceId:
            citation.sourceId.toString(),
          text:
            citation.text,
          order:
            citation.order,
        }),
      );

    const mediaLinks =
      article.mediaLinks.map(
        (media) => ({
          mediaId:
            media.props.mediaId.toString(),
          type:
            media.props.type,
          caption:
            media.props.caption,
          isFeatured:
            media.props.isFeatured,
        }),
      );

    await this.provider.query(
      `
        INSERT INTO articles (
          id,
          title,
          slug,
          summary,
          content,
          language,
          status,
          author_id,
          created_at,
          updated_at,
          published_at,
          version,
          entity_links,
          relationship_links,
          citations,
          media_links,
          tags,
          categories,
          seo
        )
        VALUES (
          $1,
          $2,
          $3,
          $4,
          $5,
          $6,
          $7,
          $8,
          $9,
          $10,
          $11,
          $12,
          $13,
          $14,
          $15,
          $16,
          $17,
          $18,
          $19
        )
        ON CONFLICT (id)
        DO UPDATE SET
          title =
            EXCLUDED.title,
          slug =
            EXCLUDED.slug,
          summary =
            EXCLUDED.summary,
          content =
            EXCLUDED.content,
          language =
            EXCLUDED.language,
          status =
            EXCLUDED.status,
          author_id =
            EXCLUDED.author_id,
          updated_at =
            EXCLUDED.updated_at,
          published_at =
            EXCLUDED.published_at,
          version =
            EXCLUDED.version,
          entity_links =
            EXCLUDED.entity_links,
          relationship_links =
            EXCLUDED.relationship_links,
          citations =
            EXCLUDED.citations,
          media_links =
            EXCLUDED.media_links,
          tags =
            EXCLUDED.tags,
          categories =
            EXCLUDED.categories,
          seo =
            EXCLUDED.seo
      `,
      [
        article.id.toString(),
        article.title,
        article.slug,
        article.summary,
        article.content,
        article.language,
        article.status,
        article.authorId.toString(),
        article.createdAt,
        article.updatedAt,
        article.publishedAt ??
          null,
        article.version,
        JSON.stringify(
          entityLinks,
        ),
        JSON.stringify(
          relationshipLinks,
        ),
        JSON.stringify(
          citations,
        ),
        JSON.stringify(
          mediaLinks,
        ),
        JSON.stringify(
          article.tags,
        ),
        JSON.stringify(
          article.categories,
        ),
        JSON.stringify(
          article.seo,
        ),
      ],
    );
  }

  async update(
    article: Article,
    expectedVersion: number,
  ): Promise<void> {
    if (
      !Number.isInteger(expectedVersion) ||
      expectedVersion < 1
    ) {
      throw new ArticleConflictError(
        'Article expected version must be a positive integer.',
      );
    }

    if (article.version !== expectedVersion + 1) {
      throw new ArticleConflictError(
        `Invalid Article version transition. Expected ${
          expectedVersion + 1
        }, received ${article.version}.`,
      );
    }

    const entityLinks = article.entityLinks.map(
      (link) => ({
        entityId: link.entityId.toString(),
      }),
    );

    const relationshipLinks =
      article.relationshipLinks.map(
        (link) => ({
          relationshipId:
            link.relationshipId.toString(),
        }),
      );

    const citations = article.citations.map(
      (citation) => ({
        articleId:
          citation.articleId.toString(),
        sourceId:
          citation.sourceId.toString(),
        text: citation.text,
        order: citation.order,
      }),
    );

    const mediaLinks = article.mediaLinks.map(
      (media) => ({
        mediaId:
          media.props.mediaId.toString(),
        type: media.props.type,
        caption: media.props.caption,
        isFeatured: media.props.isFeatured,
      }),
    );

    const result = await this.provider.query(
      `
        UPDATE articles
        SET
          title = $1,
          slug = $2,
          summary = $3,
          content = $4,
          language = $5,
          status = $6,
          author_id = $7,
          updated_at = $8,
          published_at = $9,
          version = $10,
          entity_links = $11,
          relationship_links = $12,
          citations = $13,
          media_links = $14,
          tags = $15,
          categories = $16,
          seo = $17
        WHERE id = $18
          AND version = $19
      `,
      [
        article.title,
        article.slug,
        article.summary,
        article.content,
        article.language,
        article.status,
        article.authorId.toString(),
        article.updatedAt,
        article.publishedAt ?? null,
        article.version,
        JSON.stringify(entityLinks),
        JSON.stringify(relationshipLinks),
        JSON.stringify(citations),
        JSON.stringify(mediaLinks),
        JSON.stringify(article.tags),
        JSON.stringify(article.categories),
        JSON.stringify(article.seo),
        article.id.toString(),
        expectedVersion,
      ],
    );

    if (result.rowCount !== 1) {
      throw new ArticleConflictError(
        `Article ${article.id.toString()} was modified concurrently. Expected version ${expectedVersion}.`,
      );
    }
  }

  async delete(
    id: UniqueEntityId,
  ): Promise<void> {
    await this.provider.query(
      `
        DELETE FROM articles
        WHERE id = $1
      `,
      [id.toString()],
    );
  }

  private mapRowToArticle(
    row: ArticleRow,
  ): Article {
    return Article.rehydrate(
      {
        title:
          row.title,
        slug:
          row.slug,
        summary:
          row.summary,
        content:
          row.content,
        language:
          row.language,
        status:
          row.status as ArticleStatus,
        authorId:
          new UniqueEntityId(
            row.author_id,
          ),
        createdAt:
          new Date(
            row.created_at,
          ),
        updatedAt:
          new Date(
            row.updated_at,
          ),
        publishedAt:
          row.published_at
            ? new Date(
                row.published_at,
              )
            : undefined,
        version:
          Number(row.version),

        entityLinks:
          this.parseEntityLinks(
            row.entity_links,
          ),

        relationshipLinks:
          this.parseRelationshipLinks(
            row.relationship_links,
          ),

        citations:
          this.parseCitations(
            row.citations,
          ),

        mediaLinks:
          this.parseMediaLinks(
            row.media_links,
          ),

        tags:
          this.parseTags(
            row.tags,
          ),

        categories:
          this.parseCategories(
            row.categories,
          ),

        seo:
          new ArticleSeo(
            this.parseSeo(
              row.seo,
            ),
          ),
      },
      new UniqueEntityId(
        row.id,
      ),
    );
  }

  private parseEntityLinks(
    value: unknown,
  ): EntityLink[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .filter(
        (
          entry,
        ): entry is {
          entityId: string;
        } =>
          typeof entry ===
            'object' &&
          entry !== null &&
          typeof (
            entry as Record<
              string,
              unknown
            >
          ).entityId ===
            'string',
      )
      .map(
        (entry) =>
          new EntityLink(
            new UniqueEntityId(
              entry.entityId,
            ),
          ),
      );
  }

  private parseRelationshipLinks(
    value: unknown,
  ): RelationshipLink[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .filter(
        (
          entry,
        ): entry is {
          relationshipId: string;
        } =>
          typeof entry ===
            'object' &&
          entry !== null &&
          typeof (
            entry as Record<
              string,
              unknown
            >
          ).relationshipId ===
            'string',
      )
      .map(
        (entry) =>
          new RelationshipLink(
            new UniqueEntityId(
              entry.relationshipId,
            ),
          ),
      );
  }

  private parseCitations(
    value: unknown,
  ): Citation[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .filter(
        (
          entry,
        ): entry is {
          articleId: string;
          sourceId: string;
          text: string;
          order: number;
        } => {
          if (
            typeof entry !==
              'object' ||
            entry === null
          ) {
            return false;
          }

          const candidate =
            entry as Record<
              string,
              unknown
            >;

          return (
            typeof candidate.articleId ===
              'string' &&
            typeof candidate.sourceId ===
              'string' &&
            typeof candidate.text ===
              'string' &&
            typeof candidate.order ===
              'number'
          );
        },
      )
      .map(
        (entry) =>
          new Citation(
            new UniqueEntityId(
              entry.articleId,
            ),
            new UniqueEntityId(
              entry.sourceId,
            ),
            entry.text,
            entry.order,
          ),
      );
  }

  private parseMediaLinks(
    value: unknown,
  ): MediaLink[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .filter(
        (
          entry,
        ): entry is {
          mediaId: string;
          type: any;
          caption?: string;
          isFeatured: boolean;
        } => {
          if (
            typeof entry !==
              'object' ||
            entry === null
          ) {
            return false;
          }

          const candidate =
            entry as Record<
              string,
              unknown
            >;

          return (
            typeof candidate.mediaId ===
              'string' &&
            typeof candidate.type ===
              'string' &&
            typeof candidate.isFeatured ===
              'boolean'
          );
        },
      )
      .map(
        (entry) =>
          new MediaLink({
            mediaId:
              new UniqueEntityId(
                entry.mediaId,
              ),
            type:
              entry.type,
            caption:
              entry.caption,
            isFeatured:
              entry.isFeatured,
          }),
      );
  }

  private parseTags(
    value: unknown,
  ): ArticleTag[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .filter(
        (
          entry,
        ): entry is ArticleTag =>
          typeof entry ===
            'object' &&
          entry !== null &&
          typeof (
            entry as Record<
              string,
              unknown
            >
          ).value ===
            'string',
      )
      .map(
        (entry) => ({
          value:
            entry.value,
        }),
      );
  }

  private parseCategories(
    value: unknown,
  ): ArticleCategory[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .filter(
        (
          entry,
        ): entry is ArticleCategory =>
          typeof entry ===
            'object' &&
          entry !== null &&
          typeof (
            entry as Record<
              string,
              unknown
            >
          ).name ===
            'string',
      )
      .map(
        (entry) => ({
          name:
            entry.name,
        }),
      );
  }

  private parseSeo(
    value: unknown,
  ): {
    metaTitle?: string;
    metaDescription?: string;
    openGraphMetadata?: Record<
      string,
      string
    >;
    canonicalUrl?: string;
  } {
    if (
      typeof value !==
        'object' ||
      value === null ||
      Array.isArray(value)
    ) {
      return {};
    }

    const candidate =
      value as Record<
        string,
        unknown
      >;

    let openGraphMetadata:
      | Record<string, string>
      | undefined;

    if (
      typeof candidate.openGraphMetadata ===
        'object' &&
      candidate.openGraphMetadata !==
        null &&
      !Array.isArray(
        candidate.openGraphMetadata,
      )
    ) {
      openGraphMetadata = {};

      for (
        const [
          key,
          entry,
        ] of Object.entries(
          candidate.openGraphMetadata,
        )
      ) {
        if (
          typeof entry ===
          'string'
        ) {
          openGraphMetadata[key] =
            entry;
        }
      }
    }

    return {
      metaTitle:
        typeof candidate.metaTitle ===
        'string'
          ? candidate.metaTitle
          : undefined,

      metaDescription:
        typeof candidate.metaDescription ===
        'string'
          ? candidate.metaDescription
          : undefined,

      openGraphMetadata,

      canonicalUrl:
        typeof candidate.canonicalUrl ===
        'string'
          ? candidate.canonicalUrl
          : undefined,
    };
  }

  async findLatest(
    limit: number,
    offset: number,
  ): Promise<Article[]> {
    const result =
      await this.provider.query<ArticleRow>(
        `
          SELECT *
          FROM articles
          WHERE status = 'PUBLISHED'
          ORDER BY published_at DESC NULLS LAST, created_at DESC
          LIMIT $1 OFFSET $2
        `,
        [limit, offset],
      );

    return result.rows.map((row) =>
      this.mapRowToArticle(row),
    );
  }

  async findByEntityId(
    entityId: UniqueEntityId,
  ): Promise<Article[]> {
    const result =
      await this.provider.query<ArticleRow>(
        `
          SELECT *
          FROM articles
          WHERE entity_links::text LIKE '%' || $1 || '%'
          ORDER BY created_at DESC
        `,
        [entityId.toString()],
      );

    return result.rows.map((row) =>
      this.mapRowToArticle(row),
    );
  }

  async findByCategory(
    category: string,
  ): Promise<Article[]> {
    const result =
      await this.provider.query<ArticleRow>(
        `
          SELECT *
          FROM articles
          WHERE categories::text LIKE '%' || $1 || '%'
          ORDER BY created_at DESC
        `,
        [category],
      );

    return result.rows.map((row) =>
      this.mapRowToArticle(row),
    );
  }

  async search(
    query: string,
  ): Promise<Article[]> {
    const result =
      await this.provider.query<ArticleRow>(
        `
          SELECT *
          FROM articles
          WHERE title ILIKE '%' || $1 || '%'
             OR summary ILIKE '%' || $1 || '%'
             OR content ILIKE '%' || $1 || '%'
          ORDER BY created_at DESC
          LIMIT 50
        `,
        [query],
      );

    return result.rows.map((row) =>
      this.mapRowToArticle(row),
    );
  }
}
