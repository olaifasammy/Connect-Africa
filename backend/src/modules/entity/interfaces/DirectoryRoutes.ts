import { Router } from 'express';
import { DirectoryController } from './DirectoryController';
import { AuthenticationMiddleware } from '@shared/interfaces/http/middleware/AuthenticationMiddleware';

export function createDirectoryRoutes(
  controller: DirectoryController,
  authMiddleware: AuthenticationMiddleware,
): Router {
  const router = Router();

  // Products
  router.get('/business/:id/products', controller.getProducts.bind(controller));
  router.post('/business/:id/products', authMiddleware.authenticate, controller.addProduct.bind(controller));
  router.delete('/products/:productId', authMiddleware.authenticate, controller.deleteProduct.bind(controller));

  // Claims
  router.post('/business/:id/claims', authMiddleware.authenticate, controller.submitClaim.bind(controller));
  router.get('/claims', authMiddleware.authenticate, controller.listClaims.bind(controller));
  router.post('/claims/:claimId/review', authMiddleware.authenticate, controller.reviewClaim.bind(controller));

  // Reviews
  router.post('/business/:id/reviews', authMiddleware.authenticate, controller.submitReview.bind(controller));
  router.get('/business/:id/reviews', controller.getReviews.bind(controller));

  // Inquiries / B2B Leads
  router.post('/business/:id/inquire', controller.sendInquiry.bind(controller));
  router.get('/business/:id/inquiries', authMiddleware.authenticate, controller.getInquiries.bind(controller));

  // Analytics
  router.get('/business/:id/analytics', authMiddleware.authenticate, controller.getAnalytics.bind(controller));

  return router;
}
