import { IAiRequest } from '../interfaces/IAiGateway';
export interface IAIUsagePolicy {
    isAllowed(request: IAiRequest): boolean;
}
export declare class AIUsagePolicy implements IAIUsagePolicy {
    isAllowed(request: IAiRequest): boolean;
}
