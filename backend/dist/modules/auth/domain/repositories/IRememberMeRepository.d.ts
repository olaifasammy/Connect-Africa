import { RememberMeToken } from '../value-objects/RememberMeToken';
export interface IRememberMeRepository {
    saveToken(token: RememberMeToken): Promise<void>;
    findToken(token: string): Promise<RememberMeToken | null>;
    deleteToken(token: string): Promise<void>;
}
