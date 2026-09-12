import { provide } from 'inversify-binding-decorators';
import { injectable, inject } from 'inversify';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@provide(SignedUrlService, true)
@injectable()
export class SignedUrlService {
  private readonly client: S3Client;
  private readonly bucket: string;

  constructor(region: string, bucket: string) {
    this.client = new S3Client({ region });
    this.bucket = bucket;
  }

  async generateSignedUrl(path: string, expiresInSeconds: number = 3600): Promise<string> {
    const command = new GetObjectCommand({ Bucket: this.bucket, Key: path });
    return getSignedUrl(this.client, command, { expiresIn: expiresInSeconds });
  }
}
