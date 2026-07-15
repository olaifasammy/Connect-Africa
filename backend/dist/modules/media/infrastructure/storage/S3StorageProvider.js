"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3StorageProvider = void 0;
const StorageProvider_1 = require("../../../../shared/infrastructure/storage/StorageProvider");
const client_s3_1 = require("@aws-sdk/client-s3");
class S3StorageProvider extends StorageProvider_1.StorageProvider {
    client;
    bucket;
    constructor(region, bucket) {
        super();
        this.client = new client_s3_1.S3Client({ region });
        this.bucket = bucket;
    }
    async upload(path, data) {
        await this.client.send(new client_s3_1.PutObjectCommand({
            Bucket: this.bucket,
            Key: path,
            Body: data
        }));
        return `s3://${this.bucket}/${path}`;
    }
    async download(path) {
        const response = await this.client.send(new client_s3_1.GetObjectCommand({
            Bucket: this.bucket,
            Key: path
        }));
        // Convert stream to Buffer
        const chunks = [];
        for await (const chunk of response.Body) {
            chunks.push(chunk);
        }
        return Buffer.concat(chunks);
    }
    async delete(path) {
        await this.client.send(new client_s3_1.DeleteObjectCommand({
            Bucket: this.bucket,
            Key: path
        }));
    }
}
exports.S3StorageProvider = S3StorageProvider;
//# sourceMappingURL=S3StorageProvider.js.map