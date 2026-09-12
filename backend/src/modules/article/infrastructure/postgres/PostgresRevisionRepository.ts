import { injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';

import { PostgresProvider } from '@shared/infrastructure/database/PostgresProvider';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

import {
  Revision,
} from '../../domain/entities/Revision';

import {
  ArticleSnapshot,
} from '../../domain/entities/Article';

import {
  IRevisionRepository,
} from '../../domain/repositories/IRevisionRepository';

interface RevisionRow {
  id: string;
  article_id: string;
  version_number: number | string;
  snapshot: unknown;
  metadata: unknown;
  created_at: Date | string;
}

@provide(
  'IRevisionRepository',
  true,
)
@injectable()
export class PostgresRevisionRepository
  implements IRevisionRepository
{
  constructor(
    private readonly provider: PostgresProvider,
  ) {}

  async save(
    revision: Revision,
  ): Promise<void> {
    const versionNumber =
      Number(revision.version);

    if (
      !Number.isInteger(versionNumber) ||
      versionNumber < 1
    ) {
      throw new Error(
        'Cannot persist an invalid Article revision number.',
      );
    }

    await this.provider.query(
      `
        INSERT INTO article_revisions (
          id,
          article_id,
          version_number,
          snapshot,
          metadata,
          created_at
        )
        VALUES (
          $1,
          $2,
          $3,
          $4,
          $5,
          $6
        )
      `,
      [
        revision.id.toString(),
        revision.articleId.toString(),
        versionNumber,
        JSON.stringify(
          revision.contentSnapshot,
        ),
        JSON.stringify(
          revision.metadata,
        ),
        revision.createdAt,
      ],
    );
  }

  async findById(
    id: UniqueEntityId,
  ): Promise<Revision | null> {
    const result =
      await this.provider.query<RevisionRow>(
        `
          SELECT
            id,
            article_id,
            version_number,
            snapshot,
            metadata,
            created_at
          FROM article_revisions
          WHERE id = $1
          LIMIT 1
        `,
        [id.toString()],
      );

    if (result.rows.length === 0) {
      return null;
    }

    return this.mapRow(result.rows[0]);
  }

  async findByArticleId(
    articleId: UniqueEntityId,
  ): Promise<Revision[]> {
    const result =
      await this.provider.query<RevisionRow>(
        `
          SELECT
            id,
            article_id,
            version_number,
            snapshot,
            metadata,
            created_at
          FROM article_revisions
          WHERE article_id = $1
          ORDER BY version_number ASC
        `,
        [articleId.toString()],
      );

    return result.rows.map(
      (row) => this.mapRow(row),
    );
  }

  async getLatestByArticleId(
    articleId: UniqueEntityId,
  ): Promise<Revision | null> {
    const result =
      await this.provider.query<RevisionRow>(
        `
          SELECT
            id,
            article_id,
            version_number,
            snapshot,
            metadata,
            created_at
          FROM article_revisions
          WHERE article_id = $1
          ORDER BY version_number DESC
          LIMIT 1
        `,
        [articleId.toString()],
      );

    if (result.rows.length === 0) {
      return null;
    }

    return this.mapRow(result.rows[0]);
  }

  private mapRow(
    row: RevisionRow,
  ): Revision {
    const versionNumber =
      Number(row.version_number);

    if (
      !Number.isInteger(versionNumber) ||
      versionNumber < 1
    ) {
      throw new Error(
        `Invalid persisted Article revision ${row.id}.`,
      );
    }

    const createdAt =
      new Date(row.created_at);

    if (
      Number.isNaN(
        createdAt.getTime(),
      )
    ) {
      throw new Error(
        `Invalid created_at for Article revision ${row.id}.`,
      );
    }

    const snapshot =
      this.parseJsonObject(
        row.snapshot,
        'snapshot',
        row.id,
      );

    const metadata =
      this.parseJsonObject(
        row.metadata,
        'metadata',
        row.id,
      );

    return Revision.create(
      {
        articleId:
          new UniqueEntityId(
            row.article_id,
          ),

        contentSnapshot:
          this.parseArticleSnapshot(
            snapshot,
            row.id,
          ),

        version:
          versionNumber,

        createdAt,

        metadata,
      },
      new UniqueEntityId(
        row.id,
      ),
    );
  }

  private parseArticleSnapshot(
    value: Record<string, unknown>,
    revisionId: string,
  ): ArticleSnapshot {
    const requiredStringFields = [
      'title',
      'slug',
      'summary',
      'content',
      'language',
      'status',
      'authorId',
      'createdAt',
      'updatedAt',
    ];

    for (
      const field of requiredStringFields
    ) {
      if (
        typeof value[field] !== 'string'
      ) {
        throw new Error(
          `Article revision ${revisionId} has an invalid snapshot.${field}.`,
        );
      }
    }

    const createdAt =
      new Date(
        value.createdAt as string,
      );

    const updatedAt =
      new Date(
        value.updatedAt as string,
      );

    if (
      Number.isNaN(
        createdAt.getTime(),
      )
    ) {
      throw new Error(
        `Article revision ${revisionId} has an invalid snapshot.createdAt.`,
      );
    }

    if (
      Number.isNaN(
        updatedAt.getTime(),
      )
    ) {
      throw new Error(
        `Article revision ${revisionId} has an invalid snapshot.updatedAt.`,
      );
    }

    let publishedAt:
      | string
      | undefined;

    if (
      value.publishedAt !==
        undefined &&
      value.publishedAt !== null
    ) {
      if (
        typeof value.publishedAt !==
        'string'
      ) {
        throw new Error(
          `Article revision ${revisionId} has an invalid snapshot.publishedAt.`,
        );
      }

      const parsed =
        new Date(value.publishedAt);

      if (
        Number.isNaN(
          parsed.getTime(),
        )
      ) {
        throw new Error(
          `Article revision ${revisionId} has an invalid snapshot.publishedAt.`,
        );
      }

      publishedAt =
        value.publishedAt;
    }

    const entityLinks =
      this.parseEntityLinks(
        value.entityLinks,
        revisionId,
      );

    const relationshipLinks =
      this.parseRelationshipLinks(
        value.relationshipLinks,
        revisionId,
      );

    const citations =
      this.parseCitations(
        value.citations,
        revisionId,
      );

    const mediaLinks =
      this.parseMediaLinks(
        value.mediaLinks,
        revisionId,
      );

    const tags =
      this.parseTags(
        value.tags,
        revisionId,
      );

    const categories =
      this.parseCategories(
        value.categories,
        revisionId,
      );

    if (
      typeof value.seo !== 'object' ||
      value.seo === null ||
      Array.isArray(value.seo)
    ) {
      throw new Error(
        `Article revision ${revisionId} has an invalid snapshot.seo.`,
      );
    }

    const seo =
      value.seo as Record<
        string,
        unknown
      >;

    let openGraphMetadata:
      | Record<string, string>
      | undefined;

    if (
      seo.openGraphMetadata !==
      undefined
    ) {
      if (
        typeof seo.openGraphMetadata !==
          'object' ||
        seo.openGraphMetadata === null ||
        Array.isArray(
          seo.openGraphMetadata,
        )
      ) {
        throw new Error(
          `Article revision ${revisionId} has an invalid snapshot.seo.openGraphMetadata.`,
        );
      }

      openGraphMetadata = {};

      for (
        const [
          key,
          entry,
        ] of Object.entries(
          seo.openGraphMetadata,
        )
      ) {
        if (
          typeof entry !== 'string'
        ) {
          throw new Error(
            `Article revision ${revisionId} has an invalid SEO metadata value.`,
          );
        }

        openGraphMetadata[key] =
          entry;
      }
    }

    return {
      title:
        value.title as string,
      slug:
        value.slug as string,
      summary:
        value.summary as string,
      content:
        value.content as string,
      language:
        value.language as string,
      status:
        value.status as ArticleSnapshot['status'],
      authorId:
        value.authorId as string,
      createdAt:
        value.createdAt as string,
      updatedAt:
        value.updatedAt as string,
      publishedAt,
      entityLinks,
      relationshipLinks,
      citations,
      mediaLinks,
      tags,
      categories,
      seo: {
        metaTitle:
          typeof seo.metaTitle ===
          'string'
            ? seo.metaTitle
            : undefined,

        metaDescription:
          typeof seo.metaDescription ===
          'string'
            ? seo.metaDescription
            : undefined,

        openGraphMetadata,

        canonicalUrl:
          typeof seo.canonicalUrl ===
          'string'
            ? seo.canonicalUrl
            : undefined,
      },
    };
  }

  private parseEntityLinks(
    value: unknown,
    revisionId: string,
  ): ArticleSnapshot['entityLinks'] {
    if (!Array.isArray(value)) {
      throw new Error(
        `Article revision ${revisionId} has an invalid snapshot.entityLinks.`,
      );
    }

    return value.map(
      (entry, index) => {
        if (
          typeof entry !== 'object' ||
          entry === null ||
          typeof (
            entry as Record<
              string,
              unknown
            >
          ).entityId !== 'string'
        ) {
          throw new Error(
            `Article revision ${revisionId} has an invalid snapshot.entityLinks[${index}].`,
          );
        }

        return {
          entityId: (
            entry as Record<
              string,
              string
            >
          ).entityId,
        };
      },
    );
  }

  private parseRelationshipLinks(
    value: unknown,
    revisionId: string,
  ): ArticleSnapshot['relationshipLinks'] {
    if (!Array.isArray(value)) {
      throw new Error(
        `Article revision ${revisionId} has an invalid snapshot.relationshipLinks.`,
      );
    }

    return value.map(
      (entry, index) => {
        if (
          typeof entry !== 'object' ||
          entry === null ||
          typeof (
            entry as Record<
              string,
              unknown
            >
          ).relationshipId !== 'string'
        ) {
          throw new Error(
            `Article revision ${revisionId} has an invalid snapshot.relationshipLinks[${index}].`,
          );
        }

        return {
          relationshipId: (
            entry as Record<
              string,
              string
            >
          ).relationshipId,
        };
      },
    );
  }

  private parseCitations(
    value: unknown,
    revisionId: string,
  ): ArticleSnapshot['citations'] {
    if (!Array.isArray(value)) {
      throw new Error(
        `Article revision ${revisionId} has an invalid snapshot.citations.`,
      );
    }

    return value.map(
      (entry, index) => {
        if (
          typeof entry !== 'object' ||
          entry === null
        ) {
          throw new Error(
            `Article revision ${revisionId} has an invalid snapshot.citations[${index}].`,
          );
        }

        const citation =
          entry as Record<
            string,
            unknown
          >;

        if (
          typeof citation.articleId !==
            'string' ||
          typeof citation.sourceId !==
            'string' ||
          typeof citation.text !==
            'string' ||
          typeof citation.order !==
            'number' ||
          !Number.isInteger(
            citation.order,
          )
        ) {
          throw new Error(
            `Article revision ${revisionId} has an invalid snapshot.citations[${index}].`,
          );
        }

        return {
          articleId:
            citation.articleId,
          sourceId:
            citation.sourceId,
          text:
            citation.text,
          order:
            citation.order,
        };
      },
    );
  }

  private parseMediaLinks(
    value: unknown,
    revisionId: string,
  ): ArticleSnapshot['mediaLinks'] {
    if (!Array.isArray(value)) {
      throw new Error(
        `Article revision ${revisionId} has an invalid snapshot.mediaLinks.`,
      );
    }

    return value.map(
      (entry, index) => {
        if (
          typeof entry !== 'object' ||
          entry === null
        ) {
          throw new Error(
            `Article revision ${revisionId} has an invalid snapshot.mediaLinks[${index}].`,
          );
        }

        const media =
          entry as Record<
            string,
            unknown
          >;

        if (
          typeof media.mediaId !==
            'string' ||
          typeof media.type !==
            'string' ||
          typeof media.isFeatured !==
            'boolean'
        ) {
          throw new Error(
            `Article revision ${revisionId} has an invalid snapshot.mediaLinks[${index}].`,
          );
        }

        if (
          media.caption !==
            undefined &&
          typeof media.caption !==
            'string'
        ) {
          throw new Error(
            `Article revision ${revisionId} has an invalid snapshot.mediaLinks[${index}].caption.`,
          );
        }

        return {
          mediaId:
            media.mediaId,
          type:
            media.type,
          caption:
            media.caption as
              | string
              | undefined,
          isFeatured:
            media.isFeatured,
        };
      },
    );
  }

  private parseTags(
    value: unknown,
    revisionId: string,
  ): ArticleSnapshot['tags'] {
    if (!Array.isArray(value)) {
      throw new Error(
        `Article revision ${revisionId} has an invalid snapshot.tags.`,
      );
    }

    return value.map(
      (entry, index) => {
        if (
          typeof entry !== 'object' ||
          entry === null ||
          typeof (
            entry as Record<
              string,
              unknown
            >
          ).value !== 'string'
        ) {
          throw new Error(
            `Article revision ${revisionId} has an invalid snapshot.tags[${index}].`,
          );
        }

        return {
          value: (
            entry as Record<
              string,
              string
            >
          ).value,
        };
      },
    );
  }

  private parseCategories(
    value: unknown,
    revisionId: string,
  ): ArticleSnapshot['categories'] {
    if (!Array.isArray(value)) {
      throw new Error(
        `Article revision ${revisionId} has an invalid snapshot.categories.`,
      );
    }

    return value.map(
      (entry, index) => {
        if (
          typeof entry !== 'object' ||
          entry === null ||
          typeof (
            entry as Record<
              string,
              unknown
            >
          ).name !== 'string'
        ) {
          throw new Error(
            `Article revision ${revisionId} has an invalid snapshot.categories[${index}].`,
          );
        }

        return {
          name: (
            entry as Record<
              string,
              string
            >
          ).name,
        };
      },
    );
  }

  private parseJsonObject(
    value: unknown,
    field: string,
    revisionId: string,
  ): Record<string, unknown> {
    let parsed: unknown =
      value;

    if (
      typeof value === 'string'
    ) {
      try {
        parsed =
          JSON.parse(value);
      } catch {
        throw new Error(
          `Article revision ${revisionId} has invalid JSON in ${field}.`,
        );
      }
    }

    if (
      typeof parsed !== 'object' ||
      parsed === null ||
      Array.isArray(parsed)
    ) {
      throw new Error(
        `Article revision ${revisionId} ${field} must be a JSON object.`,
      );
    }

    return parsed as Record<
      string,
      unknown
    >;
  }
}
