import { IJwtProvider } from '../../../modules/auth/domain/interfaces/IJwtProvider';
export declare class JwtProvider implements IJwtProvider {
    private readonly secret;
    private readonly expiration;
    generateToken(userId: string): string;
    verifyToken(token: string): string;
}
