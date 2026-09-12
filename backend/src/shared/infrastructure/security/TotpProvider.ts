import { provide } from 'inversify-binding-decorators';
import { ITotpProvider } from '@modules/auth/domain/interfaces/ITotpProvider';
import * as otplib from 'otplib';
import { injectable } from 'inversify';

@provide('ITotpProvider', true)
@injectable()
export class TotpProvider implements ITotpProvider {
  private authenticator: any;

  constructor() {
    this.authenticator = new otplib.TOTP();
    this.authenticator.options = { step: 30, window: 1 };
  }

  generateSecret(): string {
    return this.authenticator.generateSecret();
  }

  generateUrl(secret: string, email: string): string {
    return this.authenticator.keyuri(email, 'Connect-Africa', secret);
  }

  verifyCode(secret: string, code: string): boolean {
    return this.authenticator.check(code, secret);
  }
}
