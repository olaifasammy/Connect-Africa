import { StorageProvider } from '@shared/infrastructure/storage/StorageProvider';
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

export class S3StorageProvider extends StorageProvider {
  private readonly client: S3Client;
  private readonly bucket: string;

  constructor(region: string, bucket: string) {
    super();
    this.client = new S3Client({ region });
    this.bucket = bucket;
  }

  async upload(path: string, data: Buffer): Promise<string> {
    await this.client.send(new PutObjectCommand({
      Bucket: this.bucket,
      Key: path,
      Body: data
    }));
    return `s3://${this.bucket}/${path}`;
  }

  async download(path: string): Promise<Buffer> {
    const response = await this.client.send(new GetObjectCommand({
      Bucket: this.bucket,
      Key: path
    }));
    
    // Convert stream to Buffer
    const chunks: Uint8Array[] = [];
    for await (const chunk of response.Body as any) {
        chunks.push(chunk);
    }
    return Buffer.concat(chunks);
  }

  async delete(path: string): Promise<void> {
    await this.client.send(new DeleteObjectCommand({
      Bucket: this.bucket,
      Key: path
    }));
  }
}
