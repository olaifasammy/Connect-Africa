"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AzureBlobStorageProvider = void 0;
const StorageProvider_1 = require("../../../../shared/infrastructure/storage/StorageProvider");
class AzureBlobStorageProvider extends StorageProvider_1.StorageProvider {
    connectionString;
    containerName;
    constructor(connectionString, containerName) {
        super();
        this.connectionString = connectionString;
        this.containerName = containerName;
    }
    async upload(path, data) {
        // TODO: Implement Azure Blob Storage upload.
        // Dependency: Install @azure/storage-blob. Requires Azure Storage connection string.
        throw new Error('Not implemented');
    }
    async download(path) {
        // TODO: Implement Azure Blob Storage download.
        throw new Error('Not implemented');
    }
    async delete(path) {
        // TODO: Implement Azure Blob Storage delete.
        throw new Error('Not implemented');
    }
}
exports.AzureBlobStorageProvider = AzureBlobStorageProvider;
//# sourceMappingURL=AzureBlobStorageProvider.js.map