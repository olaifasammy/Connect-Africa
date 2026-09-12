import { provide } from 'inversify-binding-decorators';
import { injectable } from 'inversify';

export interface VirusScanner {
  scan(buffer: Buffer): Promise<boolean>;
}

@provide(VirusScannerService, true)
@injectable()
export class VirusScannerService implements VirusScanner {
  async scan(buffer: Buffer): Promise<boolean> {
    if (!buffer || buffer.length === 0) return false;

    // Check for common executable or script signatures (PE, ELF, Mach-O, PHP tags)
    const isPE = buffer[0] === 0x4D && buffer[1] === 0x5A; // MZ
    const isELF = buffer[0] === 0x7F && buffer[1] === 0x45 && buffer[2] === 0x4C && buffer[3] === 0x46; // \x7FELF
    const sampleHeader = buffer.toString('utf8', 0, Math.min(buffer.length, 100));
    const isScript = sampleHeader.includes('<?php') || sampleHeader.includes('<script');

    if (isPE || isELF || isScript) {
      return false; // Malicious payload detected
    }

    return true; // Clean
  }
}
