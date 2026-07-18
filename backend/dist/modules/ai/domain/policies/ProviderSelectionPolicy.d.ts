import { Provider } from '../entities/Provider';
export interface IProviderSelectionPolicy {
    isEligible(provider: Provider): boolean;
}
export declare class DefaultProviderSelectionPolicy implements IProviderSelectionPolicy {
    isEligible(provider: Provider): boolean;
}
