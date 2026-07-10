import { Request, Response, NextFunction } from 'express';
import { IMetricsProvider } from '../../../monitoring/IMetricsProvider';
export declare const metricsMiddleware: (metricsProvider: IMetricsProvider) => (req: Request, res: Response, next: NextFunction) => void;
