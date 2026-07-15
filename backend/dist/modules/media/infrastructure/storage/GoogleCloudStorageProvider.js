"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleCloudStorageProvider = void 0;
const StorageProvider_1 = require("../../../../shared/infrastructure/storage/StorageProvider");
class GoogleCloudStorageProvider extends StorageProvider_1.StorageProvider {
    bucketName;
    constructor(bucketName) {
        super();
        this.bucketName = bucketName;
    }
    async upload(path, data) {
        // TODO: Implement Google Cloud Storage upload.
        // Dependency: Install @google-cloud/storage. Requires GCP credentials configuration.
        throw new Error('Not implemented');
    }
    async download(path) {
        // TODO: Implement Google Cloud Storage download.
        throw new Error('Not implemented');
    }
    async delete(path) {
        // TODO: Implement Google Cloud Storage delete.
        throw new Error('Not implemented');
    }
}
exports.GoogleCloudStorageProvider = GoogleCloudStorageProvider;
//# sourceMappingURL=GoogleCloudStorageProvider.js.map