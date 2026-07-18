import { Provider } from '../entities/Provider';
export interface IProviderValidator {
    validate(provider: Provider): boolean;
}
export declare class ProviderValidator implements IProviderValidator {
    validate(provider: Provider): boolean;
}
