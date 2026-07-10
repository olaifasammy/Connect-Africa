import { IPasswordHasher } from '../../../modules/auth/domain/interfaces/IPasswordHasher';
export declare class BcryptPasswordHasher implements IPasswordHasher {
    hash(password: string): Promise<string>;
    compare(password: string, hash: string): Promise<boolean>;
}
