export type JwtTokenType =
  | 'ACCESS'
  | 'REFRESH'
  | 'PASSWORD_RESET'
  | 'EMAIL_VERIFICATION';

export interface IJwtProvider {
  generateToken(
    userId: string,
    tokenType: JwtTokenType,
  ): string;

  verifyToken(
    token: string,
    expectedTokenType?: JwtTokenType,
  ): string;
}