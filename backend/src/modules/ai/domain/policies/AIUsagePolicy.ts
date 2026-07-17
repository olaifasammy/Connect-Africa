import { IAiRequest } from '../interfaces/IAiGateway';

export interface IAIUsagePolicy {
  isAllowed(request: IAiRequest): boolean;
}

export class AIUsagePolicy implements IAIUsagePolicy {
  isAllowed(request: IAiRequest): boolean {
    // Implement business rules for AI usage
    return true; 
  }
}
