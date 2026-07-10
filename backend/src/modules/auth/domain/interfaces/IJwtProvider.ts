export interface IJwtProvider {
  generateToken(userId: string): string;
  verifyToken(token: string): string;
}
