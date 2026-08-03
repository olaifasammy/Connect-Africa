import { Router } from 'express';
export const healthRoutes = () => {
  const router = Router();
  router.get('/', (req, res) => res.status(200).json({ status: 'OK' }));
  return router;
};
