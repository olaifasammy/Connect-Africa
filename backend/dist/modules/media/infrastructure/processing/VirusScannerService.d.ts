export interface VirusScanner {
    scan(buffer: Buffer): Promise<boolean>;
}
export declare class VirusScannerService implements VirusScanner {
    scan(buffer: Buffer): Promise<boolean>;
}
