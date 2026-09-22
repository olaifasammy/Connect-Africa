import { injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { Request, Response } from 'express';
import { DirectoryService } from '../application/services/DirectoryService';

@provide(DirectoryController, true)
@injectable()
export class DirectoryController {
  constructor(private readonly directoryService: DirectoryService) {}

  // Products
  async addProduct(req: Request, res: Response): Promise<void> {
    const entityId = req.params.id as string;
    const productId = await this.directoryService.addProduct({ ...req.body, entityId });
    res.status(201).json({ success: true, data: { productId } });
  }

  async getProducts(req: Request, res: Response): Promise<void> {
    const entityId = req.params.id as string;
    const products = await this.directoryService.getProductsByBusiness(entityId);
    res.json({ success: true, data: products });
  }

  async deleteProduct(req: Request, res: Response): Promise<void> {
    const productId = req.params.productId as string;
    await this.directoryService.deleteProduct(productId);
    res.json({ success: true, message: `Product ${productId} removed.` });
  }

  // Claims
  async submitClaim(req: Request, res: Response): Promise<void> {
    const entityId = req.params.id as string;
    const applicantId = (req as any).user?.id?.toString() || req.body.applicantId;
    const claimId = await this.directoryService.submitClaim({ ...req.body, entityId, applicantId });
    res.status(201).json({ success: true, data: { claimId } });
  }

  async listClaims(req: Request, res: Response): Promise<void> {
    const status = (req.query.status as string) || 'PENDING';
    const claims = await this.directoryService.listClaims(status);
    res.json({ success: true, data: claims });
  }

  async reviewClaim(req: Request, res: Response): Promise<void> {
    const claimId = req.params.claimId as string;
    const reviewerId = (req as any).user?.id?.toString() || 'SYSTEM';
    const { approved, notes } = req.body;
    await this.directoryService.reviewClaim(claimId, reviewerId, Boolean(approved), notes);
    res.json({ success: true, message: `Claim ${claimId} reviewed successfully.` });
  }

  // Reviews
  async submitReview(req: Request, res: Response): Promise<void> {
    const entityId = req.params.id as string;
    const reviewerId = (req as any).user?.id?.toString() || req.body.reviewerId;
    const reviewId = await this.directoryService.submitReview({ ...req.body, entityId, reviewerId });
    res.status(201).json({ success: true, data: { reviewId } });
  }

  async getReviews(req: Request, res: Response): Promise<void> {
    const entityId = req.params.id as string;
    const reviews = await this.directoryService.getReviewsByBusiness(entityId);
    res.json({ success: true, data: reviews });
  }

  // Inquiries
  async sendInquiry(req: Request, res: Response): Promise<void> {
    const entityId = req.params.id as string;
    const inquiryId = await this.directoryService.sendInquiry({ ...req.body, entityId });
    res.status(201).json({ success: true, data: { inquiryId } });
  }

  async getInquiries(req: Request, res: Response): Promise<void> {
    const entityId = req.params.id as string;
    const inquiries = await this.directoryService.getInquiriesByBusiness(entityId);
    res.json({ success: true, data: inquiries });
  }

  // Analytics
  async getAnalytics(req: Request, res: Response): Promise<void> {
    const entityId = req.params.id as string;
    const analytics = await this.directoryService.getAnalyticsByBusiness(entityId);
    res.json({ success: true, data: analytics });
  }
}
