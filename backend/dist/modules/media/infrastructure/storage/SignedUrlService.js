"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignedUrlService = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
class SignedUrlService {
    client;
    bucket;
    constructor(region, bucket) {
        this.client = new client_s3_1.S3Client({ region });
        this.bucket = bucket;
    }
    async generateSignedUrl(path, expiresInSeconds = 3600) {
        const command = new client_s3_1.GetObjectCommand({ Bucket: this.bucket, Key: path });
        return (0, s3_request_presigner_1.getSignedUrl)(this.client, command, { expiresIn: expiresInSeconds });
    }
}
exports.SignedUrlService = SignedUrlService;
//# sourceMappingURL=SignedUrlService.js.map