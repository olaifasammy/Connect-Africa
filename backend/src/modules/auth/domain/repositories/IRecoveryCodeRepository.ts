import { RecoveryCode } from '../value-objects/RecoveryCode';

export interface IRecoveryCodeRepository {
  saveCodes(userId: string, codes: RecoveryCode[]): Promise<void>;
  validateCode(userId: string, code: string): Promise<boolean>;
  useCode(userId: string, code: string): Promise<void>;
}
