export declare class SignedUrlService {
    private readonly client;
    private readonly bucket;
    constructor(region: string, bucket: string);
    generateSignedUrl(path: string, expiresInSeconds?: number): Promise<string>;
}
