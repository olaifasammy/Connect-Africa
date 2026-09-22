import { injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { v4 as uuidv4 } from 'uuid';
import { PostgresProvider } from '@shared/infrastructure/database/PostgresProvider';

export interface BusinessProductDto {
  id?: string;
  entityId: string;
  title: string;
  description?: string;
  category?: string;
  sku?: string;
  priceMin?: number;
  priceMax?: number;
  currency?: string;
  imageUrls?: string[];
  isAvailable?: boolean;
}

export interface BusinessClaimDto {
  entityId: string;
  applicantId: string;
  workEmail: string;
  phoneNumber?: string;
  proofDocumentMediaId?: string;
}

export interface BusinessReviewDto {
  entityId: string;
  reviewerId: string;
  rating: number;
  title?: string;
  reviewText: string;
  proofOfInteractionMediaId?: string;
}

export interface BusinessInquiryDto {
  entityId: string;
  senderName: string;
  senderEmail: string;
  senderPhone?: string;
  subject: string;
  message: string;
  inquiryType?: 'QUOTE_REQUEST' | 'GENERAL' | 'PARTNERSHIP' | 'JOB';
}

@provide(DirectoryService, true)
@injectable()
export class DirectoryService {
  constructor(private readonly postgresProvider: PostgresProvider) {}

  // ============================================================
  // PRODUCTS & SERVICES CATALOG
  // ============================================================

  async addProduct(dto: BusinessProductDto): Promise<string> {
    const id = dto.id || uuidv4();
    const query = `
      INSERT INTO business_products_services (
        id, entity_id, title, description, category, sku, price_min, price_max, currency, image_urls, is_available, created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW(), NOW());
    `;

    await this.postgresProvider.query(query, [
      id,
      dto.entityId,
      dto.title,
      dto.description || null,
      dto.category || 'GENERAL',
      dto.sku || null,
      dto.priceMin || null,
      dto.priceMax || null,
      dto.currency || 'USD',
      JSON.stringify(dto.imageUrls || []),
      dto.isAvailable ?? true,
    ]);

    return id;
  }

  async getProductsByBusiness(entityId: string): Promise<any[]> {
    const query = `
      SELECT id, entity_id, title, description, category, sku, price_min, price_max, currency, image_urls, is_available, created_at
      FROM business_products_services
      WHERE entity_id = $1 AND is_available = TRUE
      ORDER BY created_at DESC;
    `;
    const result = await this.postgresProvider.query(query, [entityId]);
    return result.rows;
  }

  async deleteProduct(productId: string): Promise<void> {
    await this.postgresProvider.query(`DELETE FROM business_products_services WHERE id = $1`, [productId]);
  }

  // ============================================================
  // CLAIMS & VERIFICATION QUEUE
  // ============================================================

  async submitClaim(dto: BusinessClaimDto): Promise<string> {
    const id = uuidv4();
    const query = `
      INSERT INTO business_claims (
        id, entity_id, applicant_id, work_email, phone_number, proof_document_media_id, status, created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, 'PENDING', NOW());
    `;

    await this.postgresProvider.query(query, [
      id,
      dto.entityId,
      dto.applicantId,
      dto.workEmail,
      dto.phoneNumber || null,
      dto.proofDocumentMediaId || null,
    ]);

    return id;
  }

  async listClaims(status: string = 'PENDING'): Promise<any[]> {
    const query = `
      SELECT c.id, c.entity_id, c.applicant_id, c.work_email, c.phone_number, c.status, c.created_at, e.name AS business_name
      FROM business_claims c
      INNER JOIN entities e ON e.id = c.entity_id
      WHERE c.status = $1
      ORDER BY c.created_at DESC;
    `;
    const result = await this.postgresProvider.query(query, [status]);
    return result.rows;
  }

  async reviewClaim(claimId: string, reviewerId: string, approved: boolean, notes?: string): Promise<void> {
    const newStatus = approved ? 'APPROVED' : 'REJECTED';

    await this.postgresProvider.query(
      `UPDATE business_claims SET status = $1, reviewer_id = $2, review_notes = $3, reviewed_at = NOW() WHERE id = $4`,
      [newStatus, reviewerId, notes || null, claimId],
    );

    if (approved) {
      // Upgrade entity verification status upon approved claim
      const claimResult = await this.postgresProvider.query(`SELECT entity_id FROM business_claims WHERE id = $1`, [claimId]);
      if (claimResult.rows.length > 0) {
        const entityId = claimResult.rows[0].entity_id;
        await this.postgresProvider.query(
          `UPDATE entities SET verification_status = 'OFFICIALLY_VERIFIED', updated_at = NOW() WHERE id = $1`,
          [entityId],
        );
      }
    }
  }

  // ============================================================
  // COMMUNITY REVIEWS
  // ============================================================

  async submitReview(dto: BusinessReviewDto): Promise<string> {
    const id = uuidv4();
    const query = `
      INSERT INTO business_reviews (
        id, entity_id, reviewer_id, rating, title, review_text, proof_of_interaction_media_id, status, created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, 'PUBLISHED', NOW());
    `;

    await this.postgresProvider.query(query, [
      id,
      dto.entityId,
      dto.reviewerId,
      dto.rating,
      dto.title || null,
      dto.reviewText,
      dto.proofOfInteractionMediaId || null,
    ]);

    return id;
  }

  async getReviewsByBusiness(entityId: string): Promise<any[]> {
    const query = `
      SELECT r.id, r.entity_id, r.reviewer_id, r.rating, r.title, r.review_text, r.helpful_count, r.created_at, u.email AS reviewer_email
      FROM business_reviews r
      INNER JOIN users u ON u.id = r.reviewer_id
      WHERE r.entity_id = $1 AND r.status = 'PUBLISHED'
      ORDER BY r.created_at DESC;
    `;
    const result = await this.postgresProvider.query(query, [entityId]);
    return result.rows;
  }

  // ============================================================
  // LEADS & INQUIRIES
  // ============================================================

  async sendInquiry(dto: BusinessInquiryDto): Promise<string> {
    const id = uuidv4();
    const query = `
      INSERT INTO business_inquiries (
        id, entity_id, sender_name, sender_email, sender_phone, subject, message, inquiry_type, status, created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'UNREAD', NOW());
    `;

    await this.postgresProvider.query(query, [
      id,
      dto.entityId,
      dto.senderName,
      dto.senderEmail,
      dto.senderPhone || null,
      dto.subject,
      dto.message,
      dto.inquiryType || 'GENERAL',
    ]);

    // Record inquiry analytics event
    await this.recordAnalytics(dto.entityId, 'INQUIRY_SENT');

    return id;
  }

  async getInquiriesByBusiness(entityId: string): Promise<any[]> {
    const query = `
      SELECT id, entity_id, sender_name, sender_email, sender_phone, subject, message, inquiry_type, status, created_at
      FROM business_inquiries
      WHERE entity_id = $1
      ORDER BY created_at DESC;
    `;
    const result = await this.postgresProvider.query(query, [entityId]);
    return result.rows;
  }

  // ============================================================
  // DIRECTORY ANALYTICS
  // ============================================================

  async recordAnalytics(entityId: string, eventType: string, referrer?: string, countryCode?: string): Promise<void> {
    const id = uuidv4();
    const query = `
      INSERT INTO business_analytics (id, entity_id, event_type, referrer, country_code, created_at)
      VALUES ($1, $2, $3, $4, $5, NOW());
    `;
    await this.postgresProvider.query(query, [id, entityId, eventType, referrer || null, countryCode || null]);
  }

  async getAnalyticsByBusiness(entityId: string): Promise<any> {
    const query = `
      SELECT event_type, COUNT(*)::int AS event_count
      FROM business_analytics
      WHERE entity_id = $1
      GROUP BY event_type;
    `;
    const result = await this.postgresProvider.query(query, [entityId]);
    return result.rows;
  }
}
